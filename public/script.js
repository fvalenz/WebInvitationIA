// Initialization for ES Users
import { Collapse, Ripple, initMDB } from "mdb-ui-kit";
initMDB({ Collapse, Ripple });

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