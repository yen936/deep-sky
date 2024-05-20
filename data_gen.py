import numpy as np
import pandas as pd

# Constants
num_records = 100000
anomaly_percentage = 0.01
num_anomalies = int(num_records * anomaly_percentage)

# Seed for reproducibility
np.random.seed(42)

# Generate normal data distributions
normal_data = {
    "Bit Error Rate": np.random.lognormal(
        mean=-12, sigma=0.5, size=num_records - num_anomalies
    ),  # Example values
    "Pulse Duration": np.random.normal(
        loc=50, scale=5, size=num_records - num_anomalies
    ),  # Example values
    "Rise Time": np.random.normal(
        loc=10, scale=1, size=num_records - num_anomalies
    ),  # Example values
    "Fall Time": np.random.normal(
        loc=10, scale=1, size=num_records - num_anomalies
    ),  # Example values
    "Jitter": np.random.normal(
        loc=0, scale=0.1, size=num_records - num_anomalies
    ),  # Example values
    "Amplitude": np.random.normal(
        loc=1.0, scale=0.2, size=num_records - num_anomalies
    ),  # Example values
    "Signal Strength": np.random.normal(
        loc=-50, scale=10, size=num_records - num_anomalies
    ),  # Example values
    "Phase": np.random.uniform(
        low=-np.pi, high=np.pi, size=num_records - num_anomalies
    ),
    "Polarization": np.random.choice(
        [1, 0], size=num_records - num_anomalies, p=[0.5, 0.5]
    ),
    "SNR": np.random.lognormal(
        mean=3, sigma=0.5, size=num_records - num_anomalies
    ),  # Example values
    "C/N": np.random.lognormal(
        mean=3, sigma=0.5, size=num_records - num_anomalies
    ),  # Example values
}

# Generate anomalous data (jamming)
anomalous_data = {
    "Bit Error Rate": np.random.lognormal(
        mean=-5, sigma=0.5, size=num_anomalies
    ),  # Higher error rate
    "Pulse Duration": np.random.normal(
        loc=50, scale=5, size=num_anomalies
    ),  # Example values
    "Rise Time": np.random.normal(
        loc=10, scale=1, size=num_anomalies
    ),  # Example values
    "Fall Time": np.random.normal(
        loc=10, scale=1, size=num_anomalies
    ),  # Example values
    "Jitter": np.random.normal(loc=0, scale=0.1, size=num_anomalies),  # Example values
    "Amplitude": np.random.normal(
        loc=1.0, scale=0.2, size=num_anomalies
    ),  # Example values
    "Signal Strength": np.random.normal(
        loc=0, scale=5, size=num_anomalies
    ),  # Stronger signal strength
    "Phase": np.random.uniform(
        low=-np.pi, high=np.pi, size=num_anomalies
    ),  # Different phase, but still uniform
    "Polarization": np.random.choice([1, 0], size=num_anomalies, p=[0.5, 0.5]),
    "SNR": np.random.lognormal(mean=1, sigma=0.5, size=num_anomalies),  # Lower SNR
    "C/N": np.random.lognormal(mean=1, sigma=0.5, size=num_anomalies),  # Lower C/N
}

# Create DataFrames
normal_df = pd.DataFrame(normal_data)
anomalous_df = pd.DataFrame(anomalous_data)
anomalous_df["Anomaly"] = 1
normal_df["Anomaly"] = 0

# Combine the data
workingdf = (
    pd.concat([normal_df, anomalous_df])
    .sample(frac=1, random_state=42)
    .reset_index(drop=True)
)

column_to_move = "Timestamp"

# 2) current data set non dangerous anomalies
workingdf.to_csv("model_input/sim_data.csv", index=False)

workingdf = workingdf.sample(n=850, random_state=42)
workingdf = workingdf.reset_index(drop=True)
workingdf["Timestamp"] = workingdf.index + 1

cols = ["Timestamp"] + [col for col in workingdf.columns if col != "Timestamp"]
workingdf = workingdf[cols]

workingdf.to_csv("signal_server/mixed_data.csv", index=False)


# 3) make malicious data set (grouped in time)

# Randomly sample 150 good, 450 bad, 250 good
normal_df_1 = normal_df.sample(n=150, random_state=42)
anom_section = anomalous_df.sample(n=150, random_state=42)
normal_df_3 = normal_df.sample(n=250, random_state=42)


demo_df = pd.concat(
    [normal_df_1, anom_section, normal_df_3],
    ignore_index=True,
)
demo_df = demo_df.reset_index(drop=True)
demo_df["Timestamp"] = demo_df.index + 1

cols = [column_to_move] + [col for col in demo_df.columns if col != column_to_move]
demo_df = demo_df[cols]
demo_df.to_csv("signal_server/attack_data.csv", index=False)


# 1) only normal

# Reorder the DataFrame columns
normal_df_4 = normal_df.sample(n=850, random_state=42)

normal_df_4 = normal_df_4.reset_index(drop=True)
normal_df_4["Timestamp"] = normal_df_4.index +1

cols = ["Timestamp"] + [col for col in normal_df_4.columns if col != "Timestamp"]
normal_df_4 = normal_df_4[cols]

normal_df_4.to_csv("signal_server/only_normal.csv", index=False)
