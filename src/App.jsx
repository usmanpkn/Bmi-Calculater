import { useState } from 'react'
import './App.css'
import imagef from '../src/assets/bg1.png'

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const calculateBmi = () => {
    const isValidHeight = /^\d+$/.test(height);
    const isValidWeight = /^\d+$/.test(weight);

    if (isValidHeight && isValidWeight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2))
      if (bmiValue < 18.5) {
        setBmiStatus("Underweight")
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setBmiStatus("Normal Weight");
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setBmiStatus("Overweight")
      } else {
        setBmiStatus("obese")
      }
      setErrorMessage("")
    } else {
      setBmi(null);
      setBmiStatus("");
      setErrorMessage("Please enter valid numeric values for height and weight");
    }
  };

  const clearAll = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setBmiStatus("");
    setErrorMessage("");
  }

  return (
    <div className="container-fluid bgf d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className='bgs row justify-content-center align-items-center'>
        <div className='col-md-6'>
          <img src={imagef} alt="" className="img1" />
        </div>
        <div className="col-md-6 m-5 p-5">
          {errorMessage && <p className='text-danger fs-5' style={{ marginBottom: '10px' }}>{errorMessage}</p>}
          <h1 className="text-center head1">BMI Calculator</h1>
          <div className="mb-4">
            <label htmlFor="height">Height (cm):</label>
            <input className='rounded w-100' type="text" value={height} id='height' onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="weight">Weight (kg):</label>
            <input className='rounded w-100' type="text" value={weight} id='weight' onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="d-grid gap-2">
            <button onClick={calculateBmi} className='btn btn-warning rounded'>Calculate BMI</button>
            <button onClick={clearAll} className='btn btn-danger rounded mt-3'>Clear</button>
          </div>
          {bmi !== null && (
            <div className="mt-3 p-3 rounded" style={{ backgroundColor: "green", color: "white" }}>
              <p>Your BMI is: {bmi}</p>
              <p>Status: {bmiStatus}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
