# ng2-dropzone-wrapper
A jQuery based wrapper to dropzone written in typescript for angular2

## Disclaimer
This is not written as per standards of angular 2.

However this is helpful and readily available utility which can help developers who don't have any alternative and are writting manually code for file upload.

Dropzone is very good plugin for fileupload, however manytime we require to write code (and replicate them) to make most of it.

`NgModel` and other things of angular 2 is not tighly bound.

You will need to use jQuery to get data from plugin.

## Requirements
1. jQuery -
Include the jQuery (any jQuery version should work)
`<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>`

2. Dropzone - 
Include js and css
`<script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/min/dropzone.min.js" integrity="sha256-p2l8VeL3iL1J0NxcXbEVtoyYSC+VbEbre5KHbzq1fq8=" crossorigin="anonymous"></script>`
`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/min/dropzone.min.css" integrity="sha256-e47xOkXs1JXFbjjpoRr1/LhVcqSzRmGmPqsrUQeVs+g=" crossorigin="anonymous" />`

3. Font Awesome - Include js and css `<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">`

## Usage
1. Copy paste `file-upload.directive.ts` in your project. (You will need only that file.)

2. Import directive
```javascript
import { FileUploadDirective } from '<path-to-file-upload>/file-upload.directive';
```

3. Include it in html
```html
<file-upload id="idOfElement" accept=".jpg,.png,.jpeg"></file-upload>
```

If you don't use `accept` it will allow any file types.

4. Run

It will show the file uploader as following

![alt demo](images/image1.JPG)

_Note_: I am using bootstrap and 'My Uploader' label is styled with bootstrap form.

_PS_: The directive works well with bootstrap and it is responsive.

5. Upload file

Click on the file and it will open up dialog of browser to upload file. Select a file and upload.

It will show uploaded file as following

![alt uploaded file](images/image5.JPG)

Click on Remove and user can remove the file.

6. Get value in code

Calling `$('#id-of-element').data('file')` will return the whole object which your server returns.

7. Prefill with a file

If you use the component in update mode, you will need to have uploader prefilled with some document. The component does not show the image. It only shows the image name.

Include parameters `file-id` and `file-name` in file uploader.

`<file-upload id="myId" file-id="{{myFileId}}" file-name="{{myFileName}}" accept=".jpg,.png,.jpeg"></file-upload>`

It will show it as

![alt prefilled](images/image2.JPG)

User can directly upload file by clicking on anywhere on control.

![alet prefilled-again-fill](images/image4.JPG)

Gives you undo option even if user has removed file.

![alet prefilled-again-fill](images/image3.JPG)


8. Tweak the code, style and anything. Enjoy.


## Thanks
1. jQuery - [link](https://jquery.com/)
2. Dropzone - [link](http://www.dropzonejs.com/)
3. And ofcourse Angular - [link](https://angular.io/)
4. Font Awesome - [link](http://fontawesome.io/)
