const productos = [
    { 
        id: 1,
        nombre: "Waffle with Berries.", 
        precio: "$6.50", 
        imagenM: "./assets/image-waffle-mobile.jpg",
        imagenT: "./assets/image-waffle-tablet.jpg",
        imagenD: "./assets/image-waffle-desktop.jpg",
        descripcion: "Waffle"
    },
    { 
        id: 2,
        nombre: "Vanilla Bean Crème Brûlée", 
        precio: "$7.00", 
        imagenM: "./assets/image-creme-brulee-mobile.jpg",
        imagenT: "./assets/image-creme-brulee-tablet.jpg",
        imagenD: "./assets/image-creme-brulee-desktop.jpg",
        descripcion: "Crème Brûlée"
    },
    { 
        id: 3,
        nombre: "Macaron Mix of Five", 
        precio: "$8.00", 
        imagenM: "./assets/image-macaron-mobile.jpg",
        imagenT: "./assets/image-macaron-tablet.jpg",
        imagenD: "./assets/image-macaron-desktop.jpg",
        descripcion: "Macaron"
    },
    { 
        id: 4,
        nombre: "Classic Tiramisu", 
        precio: "$5.50", 
        imagenM: "./assets/image-tiramisu-mobile.jpg",
        imagenT: "./assets/image-tiramisu-tablet.jpg",
        imagenD: "./assets/image-tiramisu-desktop.jpg",
        descripcion: "Tiramisu"
    },
    { 
        id: 5,
        nombre: "Pistachio Baklava", 
        precio: "$4.00", 
        imagenM: "./assets/image-baklava-mobile.jpg",
        imagenT: "./assets/image-baklava-tablet.jpg",
        imagenD: "./assets/image-baklava-desktop.jpg",
        descripcion: "Baklava"
    },
    { 
        id: 6,
        nombre: "Lemon Meringue Pie", 
        precio: "$5.00", 
        imagenM: "./assets/image-meringue-mobile.jpg",
        imagenT: "./assets/image-meringue-tablet.jpg",
        imagenD: "./assets/image-meringue-desktop.jpg",
        descripcion: "Pie"
    },
    { 
        id: 7,
        nombre: "Red Velvet Cake", 
        precio: "$4.50", 
        imagenM: "./assets/image-cake-mobile.jpg",
        imagenT: "./assets/image-cake-tablet.jpg",
        imagenD: "./assets/image-cake-desktop.jpg",
        descripcion: "Cake"
    },
    { 

        id: 8,
        nombre: "Salted Caramel Brownie", 
        precio: "$4.50", 
        imagenM: "./assets/image-brownie-mobile.jpg",
        imagenT: "./assets/image-brownie-tablet.jpg",
        imagenD: "./assets/image-brownie-desktop.jpg",
        descripcion: "Brownie"
    },
    { 
        id: 9,
        nombre: "Vanilla Panna Cotta", 
        precio: "$6.50", 
        imagenM: "./assets/image-brownie-mobile.jpg",
        imagenT: "./assets/image-brownie-tablet.jpg",
        imagenD: "./assets/image-brownie-desktop.jpg",
        descripcion: "Brownie"
    },
];

let carrito = {};

const productGrid = document.getElementById("product-grid");

function agregarAlCarrito(id) {
    carrito[id] = carrito[id] || 0; // Si no existe, inicializar en 0
    document.getElementById(`btn-${id}`).classList.add("hidden"); // Oculta el botón
    document.getElementById(`counter-${id}`).classList.remove("hidden"); // Muestra el contador
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalItems = document.getElementById("total-items");
    const totalPrecio = document.getElementById("total-precio");
    listaCarrito.innerHTML = ""; // Limpiar lista

    let totalProductos = 0;
    let totalCosto = 0;

    Object.keys(carrito).forEach(id => {
        if (carrito[id] > 0) { // Solo mostrar si la cantidad es mayor a 0
            const producto = productos.find(p => p.id == id);
            const precioUnitario = parseFloat(producto.precio.replace("$", ""));
            const precioTotal = (precioUnitario * carrito[id]).toFixed(2);

            totalProductos += carrito[id];
            totalCosto += parseFloat(precioTotal);

            // Crear el elemento del producto en el carrito
            const item = document.createElement("li");
            item.classList.add("flex", "justify-between", "items-center", "border-b", "pb-2");

            item.innerHTML = `
                <div class="flex flex-col">
                    <span class="font-semibold">${producto.nombre}</span>
                    <span class="text-sm text-gray-500">
                       <span class="text-orange-700"> ${carrito[id]}x </span>  @ $${precioUnitario} = <strong>$${precioTotal}</strong>
                    </span>
                </div>
                <button onclick="eliminarProducto(${id})" 
                    class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                    ❌
                </button>
            `;

            listaCarrito.appendChild(item);
        }
    });

    // ✅ Actualizar el número total de productos y el precio total
    totalItems.innerText = totalProductos;
    totalPrecio.innerText = `$${totalCosto.toFixed(2)}`;

    // ✅ Guardar en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function modificarCantidad(id, cambio) {
    if (!carrito[id]) carrito[id] = 0;

    carrito[id] += cambio;

    // Evitar números negativos
    if (carrito[id] < 0) carrito[id] = 0;

    // Actualizar el número en pantalla
    document.getElementById(`cantidad-${id}`).innerText = carrito[id];

    // ✅ Llamar a actualizarCarrito() para que se reflejen los cambios en el aside
    actualizarCarrito();
}


productos.forEach(producto => {
    const productCard = document.createElement("div");
    productCard.classList.add("bg-white", "p-4", "rounded-lg", "shadow-md", "hover:shadow-lg", "transition");

    productCard.innerHTML = `
<section class="bg-white rounded-lg relative flex flex-col">
    <section class="relative w-full h-[70%]">
        <picture class="w-full h-full">
            <source srcset="${producto.imagenD}" media="(min-width: 1024px)">
            <source srcset="${producto.imagenT}" media="(min-width: 768px)">
            <img src="${producto.imagenM}" alt="${producto.nombre}" 
                class="w-full h-full object-cover rounded-lg border-2 border-transparent hover:border-orange-500 transition">
        </picture>

        <!-- Botón con hover para mostrar el contador -->
        <section class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 group">
            <!-- Botón normal -->
            <button id="btn-${producto.id}" 
                class="w-full bg-white text-black border-2 border-orange-700 px-4 py-2 rounded-full shadow-md transition group-hover:bg-orange-700 group-hover:text-white">
                🛒 Add to Cart 
            </button>

            <!-- Contador (oculto por defecto, visible en hover) -->
            <section id="counter-${producto.id}" 
                class="absolute inset-0 hidden group-hover:flex items-center justify-between bg-orange-700 text-white border-2 border-orange-700 px-4 py-2 rounded-full shadow-md">
                <button onclick="modificarCantidad(${producto.id}, -1)" class="text-xl text-orange-700 hover:text-orange-500">➖</button>
                <span id="cantidad-${producto.id}" class="text-lg">0</span>
                <button onclick="modificarCantidad(${producto.id}, 1)" class="text-xl text-orange-700 hover:text-orange-500">➕</button>
            </section>
        </section>
    </section>

    <!-- Texto de la card -->
    <section class="flex-1 text-center mt-8 flex items-start flex-col">
        <p class="text-black/70 text-sm">${producto.descripcion}</p> <!-- Descripción arriba del nombre -->
        <h2 class="text-base font-semibold">${producto.nombre}</h2>
        <p class="text-lg text-orange-700 font-semibold">${producto.precio}</p>
    </section>
</section>






    `;

    // 📌 Agregar la tarjeta al grid
    productGrid.appendChild(productCard);
});




function eliminarProducto(id) {
    delete carrito[id]; // Eliminar producto del carrito
    actualizarCarrito(); // Refrescar la UI
}

function ejecutarCompra() {
    const totalPrecio = document.getElementById("total-precio").innerText;

    if (totalPrecio === "$0.00") {
        alert("Tu carrito está vacío. Agrega productos antes de comprar.");
        return;
    }

    alert(`Compra hecha por ${totalPrecio} ✅`);

    carrito = {}; // Vaciar carrito
    actualizarCarrito(); // Refrescar la UI
}
