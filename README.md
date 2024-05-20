# Satellite Communication Anomaly Detection System

This project aims to develop a lightweight system for intercepting satellite communications and monitoring them for anomalies. The system is designed to operate on small CPU-only devices such as Raspberry Pi or Arduino Uno. This project was developed for a hackathon and won the top prize.

## Approach

The project is split into two main components:

1. **Model**: An anomaly detection model for identifying anomalies in satellite communications.
2. **Embedded System**: A hardware component responsible for intercepting and analyzing incoming communications using the trained model.

## Components

### 1. Model

An Isolation Forest model was trained on simulated data generated using `data_gen.py`. The trained model was then ported to C language for deployment on embedded systems.

### 2. Embedded System

The embedded system component consists of the following:

- **Arduino Devices**: Arduino boards equipped with RF transmitters and receivers were used to simulate satellite communications.
- **Model Deployment**: The trained Isolation Forest model was deployed directly on the receiving Arduino board for real-time anomaly detection.

### 3. GUI Dashboard

A GUI dashboard was developed using React and Node.js for visualizing the signals and monitoring the system's performance.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-repo.git`
2. Install the required dependencies for the model and GUI components.
3. Generate simulated data using `data_gen.py`--current params are based on real sat data.
4. Train the Isolation Forest model on the simulated data.
5. Port the trained model to C language for deployment on the embedded system.
6. Set up the Arduino devices with RF transmitters and receivers.
7. Deploy the trained model on the receiving Arduino board.
8. Run the GUI dashboard to visualize the signals and monitor the system's performance.

For detailed instructions, please refer to the project documentation.

## Contributing

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).