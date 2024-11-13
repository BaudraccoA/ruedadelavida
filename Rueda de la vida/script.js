function validarRango(input) {
    // Convierte el valor a número
    const valor = Number(input.value);

    // Verifica si el valor es menor que 1 o mayor que 10
    if (valor < 1) {
        input.value = 1; // Ajusta al mínimo permitido
    } else if (valor > 10) {
        input.value = 10; // Ajusta al máximo permitido
    }
}

function generateChart() {
    // Obtén los valores de cada área desde el formulario
    const dataValues = [
        document.getElementById('amigos').value,
        document.getElementById('salud').value,
        document.getElementById('finanzas').value,
        document.getElementById('trabajo').value,
        document.getElementById('diversion').value,
        document.getElementById('parejas').value,
        document.getElementById('personal').value,
        document.getElementById('familia').value
    ].map(Number);  // Convierte cada valor a número

    const labels = [
        'Amigos', 'Salud', 'Finanzas/economia', 
        'Trabajo', 'Diversion/ocio', 'RelacionesDeParejas', 'Personal', 'Familia'
    ];

    const backgroundColors = [
        'rgba(75, 192, 192, 0.4)',  // Amigos
        'rgba(255, 99, 132, 0.4)',  // Salud
        'rgba(54, 162, 235, 0.4)',  // Finanzas/economía
        'rgba(255, 206, 86, 0.4)',  // Trabajo
        'rgba(153, 102, 255, 0.4)', // Diversion/ocio
        'rgba(255, 159, 64, 0.4)',  // Relaciones de parejas
        'rgba(199, 199, 199, 0.4)', // Personal
        'rgba(83, 102, 255, 0.4)'   // Familia
    ];

    const borderColors = [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(199, 199, 199, 1)',
        'rgba(83, 102, 255, 1)'
    ];

    const ctx = document.getElementById('myChart').getContext('2d');

    // Destruye el gráfico existente solo si es una instancia de Chart
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    // Crea un gradiente de color que cambia en cada segmento
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    backgroundColors.forEach((color, index) => {
        gradient.addColorStop(index / (backgroundColors.length - 1), color);
    });
    

    // Crea un nuevo gráfico de radar con un solo dataset para conectar las áreas
    window.myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nivel de Satisfacción',
                data: dataValues,
                backgroundColor: gradient,  // Rellena el área con el gradiente
                borderColor: borderColors,
                borderWidth: 2,
                pointBackgroundColor: borderColors,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: borderColors
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    min: 0,
                    max: 10,
                    ticks: {
                        stepSize: 1,
                        display: false,  // Ocultamos los números en las líneas exteriores
                    },
                    pointLabels: {
                        font: {
                            size: 12
                        },
                        color: 'black',  // Color de las etiquetas de cada área
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
    // Mostrar el botón de exportar a PDF
    document.getElementById('exportButton').hidden = false;
}
async function exportChart() {
    const { jsPDF } = window.jspdf;
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

    // Crear un nuevo canvas temporal
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    // Establecer fondo blanco en el canvas temporal
    tempCtx.fillStyle = '#FFFFFF';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Dibujar el contenido del canvas original en el canvas temporal
    tempCtx.drawImage(canvas, 0, 0);

    // Convertir el canvas temporal a imagen
    const image = tempCanvas.toDataURL('image/jpeg', 1.0);

    // Crear el PDF
    const pdf = new jsPDF('landscape');
    pdf.addImage(image, 'JPEG', 10, 10, 180, 100);  // Ajustar tamaño según sea necesario
    pdf.save('grafico_rueda_deportista.pdf');
}

