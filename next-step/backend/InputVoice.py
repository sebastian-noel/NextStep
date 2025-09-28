import os
import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

# Load environment variables from a .env file
load_dotenv()

# Initialize the Flask application
app = Flask(__name__)
# Enable CORS for all domains, allowing your frontend to connect
CORS(app)


def fetch_call_details(call_id):
    """Fetches call details from the VAPI API using the call_id."""
    url = f"https://api.vapi.ai/call/{call_id}"
    headers = {
        "Authorization": f"Bearer {os.getenv('VAPI_API_KEY')}"
    }
    
    # Make the authenticated request to VAPI
    response = requests.get(url, headers=headers)
    
    # Check if the VAPI API request was successful
    response.raise_for_status() 
    
    return response.json()


@app.route("/call-details", methods=["GET"])
def get_call_details():
    """Endpoint to retrieve and filter call details by ID."""
    call_id = request.args.get("call_id")
    
    if not call_id:
        return jsonify({"error": "Call ID is required"}), 400
        
    try:
        response = fetch_call_details(call_id)
        
        # If VAPI returns an error object, handle it gracefully
        if response.get("error"):
            return jsonify({"error": response.get("error")}), 404
            
        summary = response.get("summary")
        analysis = response.get("analysis")
        
        # Return only the requested fields
        return jsonify({"analysis": analysis, "summary": summary}), 200
        
    except requests.exceptions.HTTPError as http_err:
        # Handle 4xx or 5xx errors from the VAPI API
        return jsonify({"error": f"VAPI API error: {http_err}"}), http_err.response.status_code
    except Exception as e:
        # Handle other errors (e.g., network or parsing)
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "Internal server error"}), 500
    
if __name__ == "__main__":
    # Runs the application on http://127.0.0.1:5000/
    app.run(debug=True)