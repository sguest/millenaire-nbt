define("fileParserTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fileParser", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseTextFile = exports.parseImage = void 0;
    function parseImage(file, index, path) {
        return new Promise((resolve, reject) => {
            file.async('blob').then(createImageBitmap).then(image => {
                let canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                let context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);
                resolve({ imageData: context.getImageData(0, 0, image.width, image.height), index, path });
            }).catch(e => {
                reject(e);
            });
        });
    }
    exports.parseImage = parseImage;
    function parseTextFile(file) {
        return new Promise((resolve, reject) => {
            file.async('string').then(content => {
                let width = 0;
                let length = 0;
                let startLevels = [];
                for (let line of content.split(/\r?\n/)) {
                    if (line.startsWith('building.width')) {
                        width = +line.split('=')[1];
                    }
                    else if (line.startsWith('building.length')) {
                        length = +line.split('=')[1];
                    }
                    else if (line.startsWith('initial.startlevel')) {
                        startLevels[0] = +line.split('=')[1];
                    }
                    else if (/^upgrade\d+\.startlevel/.test(line)) {
                        let level = +/^upgrade(\d+)/.exec(line)[1];
                        startLevels[level] = +line.split('=')[1];
                    }
                }
                resolve({ width, length, startLevels });
            }).catch(e => {
                reject(e);
            });
        });
    }
    exports.parseTextFile = parseTextFile;
});
/// <reference path="../types/file-saver.d.ts" />
define("index", ["require", "exports", "jszip", "fileParser"], function (require, exports, JSZip, fileParser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.start = void 0;
    let worker;
    function waitForBuilding(building, deltaOnly) {
        return new Promise((resolve, reject) => {
            Promise.all(building.promises).then(() => {
                building.promises = [];
                let transferred = [];
                for (let png of building.pngs) {
                    transferred.push(png.imageData.data.buffer);
                }
                worker.postMessage({ cmd: 'building', data: { building, deltaOnly } }, transferred);
                resolve();
            }).catch(e => {
                reject(e);
            });
        });
    }
    function showMessage(message, messageType) {
        let messageBoard = (document.querySelector("#message-board"));
        let newMessage = document.createElement('div');
        newMessage.innerText = message;
        newMessage.classList.add('alert');
        newMessage.classList.add('alert-' + messageType);
        messageBoard.appendChild(newMessage);
    }
    function start() {
        let blocklistInput = (document.querySelector('#blocklist'));
        let fileInput = (document.querySelector('#upload'));
        let goButton = (document.querySelector('#go'));
        let downloadButton = (document.querySelector('#download'));
        let downloadIcon = (document.querySelector('#download-icon'));
        let downloadText = (document.querySelector('#download-text'));
        let deltaCheckbox = (document.querySelector("#deltaOnly"));
        let messageBoard = (document.querySelector("#message-board"));
        worker = new Worker('worker-main.js');
        worker.addEventListener('message', e => {
            let data = e.data;
            if (data.cmd === 'output') {
                downloadIcon.classList.add('d-none');
                downloadText.innerText = 'Download';
                downloadButton.disabled = false;
                downloadButton.classList.add('btn-success');
                downloadButton.classList.remove('btn-primary');
                downloadButton.addEventListener('click', () => {
                    saveAs(data.blob, 'buildings.zip');
                });
            }
            else if (data.cmd === 'warning') {
                showMessage(data.message, 'warning');
            }
            else if (data.cmd === 'error') {
                showMessage(data.message, 'danger');
            }
        });
        goButton.addEventListener('click', () => {
            messageBoard.innerHTML = '';
            if (!blocklistInput.files?.length || !fileInput.files?.length) {
                showMessage('Please supply all required files', 'danger');
                return;
            }
            if (!/\.zip$/.test(fileInput.files[0].name)) {
                showMessage('Buildings file should be a zip archive', 'danger');
                return;
            }
            try {
                goButton.classList.add('d-none');
                downloadButton.classList.remove('d-none');
                worker.postMessage({ cmd: 'blocklist', data: blocklistInput.files });
                JSZip.loadAsync(fileInput.files[0]).then(zip => {
                    let currentBuilding = null;
                    let buildingPromises = [];
                    let deltaOnly = deltaCheckbox.checked;
                    zip.forEach((path, entry) => {
                        if (/\.txt$/.test(path)) {
                            if (currentBuilding) {
                                buildingPromises.push(waitForBuilding(currentBuilding, deltaOnly));
                            }
                            currentBuilding = {
                                path: path,
                                pngs: [],
                                promises: [],
                            };
                            currentBuilding.promises.push(new Promise((resolve, reject) => {
                                let thisBuilding = currentBuilding;
                                fileParser_1.parseTextFile(entry).then(data => {
                                    thisBuilding.textFile = data;
                                    resolve();
                                }).catch(e => {
                                    reject(e);
                                });
                            }));
                        }
                        else if (/\.png$/.test(path)) {
                            currentBuilding?.promises.push(new Promise((resolve, reject) => {
                                let thisBuilding = currentBuilding;
                                let index = +path.replace(/\.png$/, '')?.match(/\d+$/)[0];
                                fileParser_1.parseImage(entry, index, path).then(data => {
                                    thisBuilding.pngs.push(data);
                                    resolve();
                                }).catch(e => {
                                    reject(e);
                                });
                            }));
                        }
                    });
                    if (currentBuilding) {
                        buildingPromises.push(waitForBuilding(currentBuilding, deltaOnly));
                    }
                    Promise.all(buildingPromises).then(() => {
                        worker.postMessage({ cmd: 'buildingsDone' });
                    }).catch(e => {
                        showMessage(e.toString(), 'danger');
                    });
                }).catch(e => {
                    showMessage(e.toString(), 'danger');
                });
            }
            catch (e) {
                showMessage(e.toString(), 'danger');
            }
        });
    }
    exports.start = start;
});
//# sourceMappingURL=index.js.map