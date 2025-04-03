import React from 'react';


//BASERT PÅ "MultipleInputForm.jsx" FRA FORELESNING!!
const WorkoutForm=()=>{
    const handleSubmit =(event)=>{
        event.preventDefault(); //gidder ikke få tomme svar
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        console.log('Form Data:', data);//kontrollprint
        alert("Form Data: " +JSON.stringify(data));//popup med dataene vi har ført inn
    };

    return (
        <div>
            {/*ÆRLIG FORSØK PÅ CSS HER NÅ FØR INNLEVERING LOL*/}
            <style>{`

                .mb-4 {
                    
                    padding: 15px;
                }

            `}</style>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded">
            <div className="mb-4">
                <label htmlFor="exercise" className="block text-gray-700 mb-2">Øvelse: </label>
                <select
                id="exercise"
                name="exercise"
                className="w-full px-3 py-2 border rounded"
                required
                >
                <option value="">Velg en øvelse</option>
                <option value="bicepCurls">Bicep curls</option>
                <option value="bicepCurls">Bicep curls</option>
                <option value="benkpress">Benkpress</option>
                <option value="bicepCurls">Bicep curls</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlfor="antReps" className="block text-gray-700 mb-2">Antall reps per sett: </label>
                <input
                    type="number"
                    id="antReps"
                    name="antReps"
                    className="w-full px-3 py-2 border rounded"
                    min="0"
                    
                />
            </div>
            <div className="mb-4">
                <label htmlfor="antSett" className="block text-gray-700 mb-2">Antall sett: </label>
                <input
                    type="number"
                    id="antSett"
                    name="antSett"
                    className="w-full px-3 py-2 border rounded"
                    min="0"
                    
                />
            </div>
            <div className="mb-4">
                <label htmlFor="kommentar" className="block text-sm font-medium text-gray-700">Kommentar</label>
                <textarea
                    id="kommentar"
                    name="kommentar"
                    
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"

                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Submit
            </button>
        </form>
        </div>
    );

};

export default WorkoutForm;