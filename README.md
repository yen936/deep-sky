# Satellite Cybersecurity Intrusion Detection System using Anomaly Detection

Operation Deep Sky is a lightweight intrusion detection system to protect satellite communications from jamming or spoofing. The system uses machine learning based anomaly detection and is designed to operate on small CPU-only devices such as Raspberry Pi or Arduino Uno--simulating the small compute in space.

## Hackathon - First Prize

Operation Deep Sky took First Prize Overall at the 2024 Space Coast Hard Tech Hackathon.

The hack was hosted by Florida Tech's Center for Advanced Manufacturing and Innovative Design. The hackathon challenged engineers to develop solutions for problems related to aerospace, defense, hardware, and manufacturing.

## Video

This is the hardware demo

![](./media/IMG_3126.mp4)

## Approach

The project demos the hardware and software solution together to simulate and detect anomalies in satellite communications:

**Simulation Environment**: A dedicated setup comprising three Arduino boards was used to mimic satellite communication scenarios accurately. One Arduino board was equipped with an RF receiver, simulating the satellite's receiving module. The other two Arduino boards were fitted with RF transmitters, representing a ground station and an adversary, respectively.  The model was specifically trained to recognize the signal patterns from the simulated ground station as normal. Consequently, when the adversary transmitter broadcasted its signal, the model identified it as an anomaly, effectively detecting potential jamming or interference attempts.

## Components

### 1. Model

The Unsupervised learning Isolation Forest model was trained on simulated data generated using `data_gen.py`. The simulated data's characteristics came from real satellite transmissions published by SatNOGS.

### 2. Embedded System

The embedded system component consists of the following:

- **Arduino Devices**: Arduino boards equipped with RF transmitters and receivers were used to simulate satellite communications.
- **Model Deployment**: The trained model was deployed directly on the receiving Arduino board for real-time anomaly detection.

### 3. GUI Dashboard

A GUI dashboard was developed using React and Node.js for visualizing the signals and representing what the system would be recognizing.

- Satellite 1: Shows normal signal from the ground station, used to train the model
- Satellite 2: Shows normal signal with occasional anomalies. Detected by the model but not characteristic of an attack
- Satellite 3: Shows a consistent string of anomalies indicating attack. The system would alert the satellite to deploy countermeasures

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-repo.git`
2. Install the required dependencies for the model and GUI components.
3. Generate simulated data using `data_gen.py`--current params are based on real sat data.
4. Train the Isolation Forest model on the simulated data.
5. Set up the Arduino devices with RF transmitters and receivers.
6. Deploy the trained model on the receiving Arduino board.
7. Run the GUI dashboard to visualize the signals and monitor the system's performance.

## License

This project is licensed under the [MIT License](LICENSE).
