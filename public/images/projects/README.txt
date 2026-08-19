========================================================================
ASENT WEBSITE — PROJECT GALLERY IMAGES FOLDER
========================================================================

Save your project gallery photos in this directory!

Directory Location:
public/images/projects/

------------------------------------------------------------------------
HOW TO ADD PHOTOS TO A PROJECT IN THE WEBSITE:
------------------------------------------------------------------------

1. Copy your project photos into this folder:
   Example files:
   - public/images/projects/mangrove-1.jpg
   - public/images/projects/mangrove-2.jpg
   - public/images/projects/mangrove-3.jpg

2. Open "data.js" in your code editor.

3. Find the project in the PROJECTS list and add the "gallery" array:

   Example:
   {
     img: 'mangrove',
     title: 'The Mangrove',
     status: 'Under construction',
     cats: ['progress', 'residential'],
     meta: 'TPL Properties · Karachi',
     scope: 'Piling, ground improvement, infrastructure works...',
     
     // 📸 ADD YOUR PHOTO PATHS HERE:
     gallery: [
       '/images/projects/mangrove-1.jpg',
       '/images/projects/mangrove-2.jpg',
       '/images/projects/mangrove-3.jpg'
     ]
   }

That's it! The website will automatically update the Lightbox Slider with your new photos!
