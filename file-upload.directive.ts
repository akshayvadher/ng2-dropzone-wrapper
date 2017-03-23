import { Directive, ElementRef, Input, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';

declare var $: any;
declare var Dropzone: any;

@Directive({
    selector: 'file-upload'
})
export class FileUploadDirective implements OnDestroy, AfterViewInit, OnChanges {
    wrapperId: string;
    wrapperId$: any;
    id: string;
    id$: any;
    dzId: string;
    css: string = `<wrapper><style id="file-upload-style">
    .showcase{border:1px dashed #000;background:#c5c5c5;color:white;padding:5px;cursor: pointer;}
    .fu-remove{padding-left:5px;color:#e74c3c;}
    .fu-undo{padding-left:5px;color:#3498db;}
    .hidden{display:none;visibility:hidden;}
    </style></wrapper>`;
    defaultMessage: string = 'Click here to upload file';
    thisDropzone: any;

    @Input('file-id') fileId: string;
    @Input('file-name') fileName: string;
    @Input() accept: string;

    @Input('url') url: string;

    constructor(
        private el: ElementRef
    ) {
        this.id = Math.random().toString().replace('.', '');
        this.createElement();
    }
    createElement() {
        this.el.nativeElement.innerHTML = this.getHtml();
    }
    getHtml(): string {
        let template =
            `<wrapper><div class="file-upload-main">
                <div class="showcase"></div>
            </div></wrapper>`;
        let $template = $(template);
        $template.find('.file-upload-main').attr('id', this.id).find('.showcase').text(this.defaultMessage);
        return $template.html();
    }

    ngAfterViewInit() {
        let _thisDirective = this;
        // add css
        this.id$ = $('#' + this.id);
        this.dzId = 'fu-dz-' + this.id;
        this.wrapperId = this.id$.parent().attr('id');
        this.wrapperId$ = $('#' + this.wrapperId);
        if (!$('#file-upload-style')[0]) {
            $('body').append($(this.css).html());
        }
        // add dropzone input


        $('body').append('<div class="hidden" id="' + this.dzId + '"></div>');
        setTimeout(() => {
            _thisDirective.thisDropzone = new Dropzone('#' + this.dzId, {
                url: this.url,
                addRemoveLinks: true,
                removedfile: (file: any) => {
                    let _ref: any;
                    return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
                },
                maxFilesize: 5,
                acceptedFiles: this.accept ? this.accept : null,
                // dictDefaultMessage: 'Click here or Drop files to upload',
                params: { type: '' },
                success: (file: any, response: any) => {
                    file.serverId = response.id;
                    _thisDirective.uploaded(response);
                },
                error: (file: any, error: any) => {
                    alert('Error' + error);
                },
                processing: (file: any, other: any) => {
                    _thisDirective.id$.find('.showcase').html('Uploading ' + file.name);
                },
            });
        }, 100);

        setTimeout(() => {
            this.bindEvent();
        }, 200);
    }
    bindEvent() {
        this.id$.on('click', () => {
            $('#' + this.dzId).trigger('click');
        });
    }
    bindRemoveEvent() {
        let _thisDirective = this;
        this.id$.find('.fu-remove').off('click').on('click', (evt: any) => {
            evt.preventDefault();
            evt.stopPropagation();
            _thisDirective.removeFile();
        });
    }
    bindUndoEvent() {
        let _thisDirective = this;
        this.id$.find('.fu-undo').off('click').on('click', (evt: any) => {
            evt.preventDefault();
            evt.stopPropagation();
            _thisDirective.fillWithNames();
        });
    }

    uploaded(document: any) {
        this.id$.find('.showcase').html('File ' + document.name + ' uploaded');
        setTimeout(() => {
            this.id$.find('.showcase').html(document.name + '<a class="fu-remove"><u>Remove</u></a>');
            if (this.fileId && this.fileName) {
                this.id$.find('.showcase').append('<a class="fu-undo"><u>Undo</u></a>');
                this.bindUndoEvent();
            }
            this.bindRemoveEvent();
        }, 2000);
        let createdBy = document.createdBy;
        let createdOn = document.createdOn;
		let modifiedOn = document.modifiedOn;
		let modifiedBy = document.modifiedBy;
        delete document.createdBy;
        delete document.createdOn;
        delete document.modifiedOn;
        delete document.modifiedBy;
        this.wrapperId$.data('file', document);
        this.wrapperId$.data('created-by', createdBy);
        this.wrapperId$.data('created-on', createdOn);
        this.wrapperId$.data('modified-on', modifiedOn);
        this.wrapperId$.data('modified-by', modifiedBy);
    }

    removeFile() {
        if (this.id$ && this.wrapperId$) {
            if (!this.fileId && !this.fileName) {
                this.id$.find('.showcase').html(this.defaultMessage);
            } else {
                this.id$.find('.showcase').html(this.defaultMessage + '<a class="fu-undo"><u>Undo</u></a>');
                this.bindUndoEvent();
            }
            this.wrapperId$.data('file', null);
        }
    }

    ngOnChanges(changes: any) {
        if (this.fileId && this.fileName) {
            this.fillWithNames();
        } else {
            this.removeFile();
        }
    }

    fillWithNames() {
        this.wrapperId$.data('file', { id: this.fileId, name: this.fileName });
        this.id$.find('.showcase').html(this.fileName + '<a class="fu-remove"><u>Remove</u></a>');
        this.bindRemoveEvent();
    }

    ngOnDestroy() {
        this.id$.off('click');
        this.id$.find('.fu-remove').off('click');
        this.id$.find('.fu-undo').off('click');
        if (this.thisDropzone) {
            this.thisDropzone.destroy();
        }
        $('#' + this.dzId).remove();
    }
}
