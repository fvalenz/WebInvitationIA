// document.addEventListener('DOMContentLoaded', function() {
//     const gallery = document.getElementById('imageGallery');

//     // Recupera las imágenes almacenadas y las muestra en la galería
//     fetch('/get-images')
//         .then(response => response.json())
//         .then(images => {
//             images.forEach(image => {
//                 const imgWrapper = document.createElement('div');
//                 imgWrapper.classList.add('grid-item');
                
//                 const img = document.createElement('img');
//                 img.src = `/gallery/${image.filename}`;
//                 img.alt = 'Gallery Image';

//                 imgWrapper.appendChild(img);
//                 gallery.appendChild(imgWrapper);
//             });

//             // Inicializa la galería y el lightbox
//             gridGallery({
//                 selector: '#imageGallery',
//                 darkMode: false,
//                 gapLength: 10,
//                 rowHeight: 200,
//                 columnWidth: 200,
//                 hoverEffect: true,
//             });

//             // Lightbox para la visualización de imágenes
//             const lightbox = new SimpleLightbox('#imageGallery a', {
//                 captions: true,
//                 captionDelay: 250,
//             });
//         })
//         .catch(err => console.error('Error al cargar las imágenes:', err));
// });

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('imageGallery');

    // Recupera las imágenes almacenadas y las muestra en la galería
    fetch('/get-images')
        .then(response => response.json())
        .then(images => {
            images.forEach(image => {
                const link = document.createElement('a');
                link.href = `/gallery/${image.filename}`;
                link.classList.add('grid-item');
                link.setAttribute('data-lightbox', 'gallery');

                const img = document.createElement('img');
                img.src = `/gallery/${image.filename}`;
                img.alt = 'Gallery Image';

                link.appendChild(img);
                gallery.appendChild(link);
            });

            // Inicializa SimpleLightbox después de cargar las imágenes
            new SimpleLightbox('#imageGallery a', {
                captions: true,
                captionDelay: 250,
            });
        })
        .catch(err => console.error('Error al cargar las imágenes:', err));
});
