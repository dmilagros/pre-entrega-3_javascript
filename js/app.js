let nuevoHistorialPrestamos = [];

function calcularPrestamo() {
  // Obtener valores de los inputs con desestructuración
  const { importe, interes, periodo } = {
    importe: parseFloat(document.getElementById("importe").value),
    interes: parseFloat(document.getElementById("interes").value),
    periodo: parseInt(document.getElementById("periodo").value, 10),
  };

  // Validación utilizando operador ternario
  if (
    isNaN(importe) ||
    importe <= 0 ||
    isNaN(interes) ||
    interes < 0 ||
    isNaN(periodo) ||
    periodo <= 0
  ) {
    document.getElementById("resultado").innerText =
      "Por favor, ingrese valores válidos.";
    return;
  }

  // Cálculos
  const importeTotal = parseFloat(
    (importe + (importe * interes) / 100).toFixed(2)
  );
  const cuotaMensual = parseFloat((importeTotal / periodo).toFixed(2));

  // Guardar nuevo préstamo con spread
  nuevoHistorialPrestamos.push({
    importe,
    interes,
    periodo,
    importeTotal,
    cuotaMensual,
  });

  // Mostrar detalles utilizando operador ternario
  document.getElementById("resultado").innerText = `
      Importe solicitado: ${importe}
      \nPorcentaje de interés: ${interes}%
      \nPeriodo: ${periodo} meses
      \nImporte total a pagar: ${importeTotal}
      \nCuota mensual: ${cuotaMensual}`;

  // Llamar a la función para actualizar el historial
  actualizarHistorial();
}

function actualizarHistorial() {
  const historialList = document.getElementById("historial");
  historialList.innerHTML = ""; // Limpiar historial

  // Prestamos guardados (puedes simular otros préstamos)
  const prestamosGuardados = [
    {
      importe: 5000,
      interes: 5,
      periodo: 24,
      importeTotal: 5000 + (5000 * 5) / 100,
      cuotaMensual: (5000 + (5000 * 5) / 100) / 24,
    },
    {
      importe: 3000,
      interes: 7,
      periodo: 12,
      importeTotal: 3000 + (3000 * 7) / 100,
      cuotaMensual: (3000 + (3000 * 7) / 100) / 12,
    },
  ];

  // Combinar el historial actual con nuevos préstamos usando spread
  const historialCompleto = [...prestamosGuardados, ...nuevoHistorialPrestamos];

  // Iterar sobre el historial combinado
  historialCompleto.forEach(
    ({ importe, interes, periodo, importeTotal, cuotaMensual }, index) => {
      const div = document.createElement("div");
      div.classList.add("prestamo-item");

      // Crear título con operador ternario
      const h4 = document.createElement("h4");
      h4.textContent = `Préstamo ${index + 1}:`;
      div.appendChild(h4);

      // Crear lista de detalles usando desestructuración para cada préstamo
      const ul = document.createElement("ul");
      const detalles = [
        `Importe: ${importe}`,
        `Interés: ${interes}%`,
        `Periodo: ${periodo} meses`,
        `Importe total a pagar: ${importeTotal}`,
        `Cuota mensual: ${cuotaMensual}`,
      ];

      // Iterar para agregar los detalles en li
      detalles.forEach((detalle) => {
        const li = document.createElement("li");
        li.textContent = detalle;
        ul.appendChild(li);
      });

      div.appendChild(ul);
      historialList.appendChild(div);
    }
  );
}
