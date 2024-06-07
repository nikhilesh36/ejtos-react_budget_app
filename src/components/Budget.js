import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { dispatch, currency, expenses, budget } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const setBudget = (newBudget) => {
        if (newBudget < totalExpenses) {
            alert(`The value cannot be lower than the already allocated budget ${currency}${totalExpenses}`);
        }
        
        if (newBudget <= 20000) {
            // Dispatches a new event to the AppContext to change the budget.
            dispatch({
                type: "SET_BUDGET",
                payload: newBudget,
            });
        } else {
            alert(`Budget cannot exceed ${currency}20000`);
        }

    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}</span>
            <input
                required='required'
                type='number'
                id='budget'
                placeholder='Budget'
                onInput="validity.valid||(value='');"
                value={budget}
                min={totalExpenses}
                max='20000'
                step='10'
                onChange={(event) => setBudget(event.target.value)}
            >
            </input>
        </div>
    );
};

export default Budget;
