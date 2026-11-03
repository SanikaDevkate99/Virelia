    import random

def run_simulated_cnn_diagnosis(species: str, symptoms: str) -> dict:
    """
    Transparent demo diagnosis service.
    Separated from API routes so a trained PyTorch model can plug in cleanly.
    """
    conditions = [
        {"condition": "Early Powdery Mildew", "confidence": 0.89},
        {"condition": "Nitrogen Deficiency", "confidence": 0.84},
        {"condition": "Overwatering Root Stress", "confidence": 0.92},
        {"condition": "Optimal Plant Health - No Pathology Detected", "confidence": 0.96}
    ]
    picked = random.choice(conditions)
    return {
        "simulated_condition": picked["condition"],
        "confidence_score": picked["confidence"],
        "is_simulated": True
    }
