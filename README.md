## Image Upload Exercise  
**Goal:** Create an input component that allows a user to upload an image, crop it to a size determined by the user, save the cropped image to an API, and then view the saved image.  

**Requirements:**  
* Please use standard Javascript/ES6 and React for your solution.  
* The maximum image dimensions after cropping should be 800px (width) x 100px (height).  
* The maximum file size of the initial uploaded image should be 1mb.  
* There is no need to actually upload the image to an API, just emulate doing so using the following code and use the returned URL for previewing the image:    
```javascript
function saveImage(imageFile) {  
    return Promise.resolve("http://lorempixel.com/800/100/cats/");  
}
```

* The input should be clearable and no image is a valid value.  
* There should be a button called "Print Preview". When clicked it should open a new tab, print a page which has the new image centered at the top, and then close the tab after printing. If no image has been saved then the button should be disabled. The displayed image should be no higher than 100px.  
