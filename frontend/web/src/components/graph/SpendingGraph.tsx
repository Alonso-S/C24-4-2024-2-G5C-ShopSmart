import React from "react";
import { Line } from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import styles from "./spending-graph.module.css";

// Registra los componentes de Chart.js que se utilizarán en el gráfico
ChartJS.register(
    CategoryScale, // Escala para el eje X
    LinearScale, // Escala para el eje Y
    PointElement, // Elemento para los puntos (círculos) en el gráfico de líneas
    LineElement, // Elemento para las líneas
    Title, // Título del gráfico
    Tooltip, // Información emergente (tooltip)
    Legend, // Leyenda
);

const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "Spending",
            data: [300, 400, 200, 500, 350, 600],
            borderColor: "#00BCD4",
            backgroundColor: "rgba(0, 188, 212, 0.1)",
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Spending Over Time",
        },
    },
    scales: {
        x: {
            type: "category" as const, // Usa la escala de 'category' para el eje X
            title: {
                display: true,
                text: "Month",
            },
        },
        y: {
            type: "linear" as const, // Usa la escala 'linear' para el eje Y
            beginAtZero: true,
            title: {
                display: true,
                text: "Amount ($)",
            },
            ticks: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                callback: function (value: any) {
                    return "$" + value;
                },
            },
        },
    },
};

const SpendingGraph: React.FC = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Spending Over Time</h2>
            <div className={styles.graphContainer}>
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default SpendingGraph;
