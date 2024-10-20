const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to update the total amount
function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    totalAmount.textContent = total.toFixed(2);
}

// Function to add an expense to the list
function addExpenseToList(expense) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${expense.name} - $${expense.amount} (on ${expense.date})
        <button onclick="removeExpense('${expense.id}')">Delete</button>
    `;
    expenseList.appendChild(li);
}

// Function to remove an expense
function removeExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

// Function to render the expenses
function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach(expense => addExpenseToList(expense));
    updateTotal();
}

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;
    const date = document.getElementById('expense-date').value;

    const expense = {
        id: Date.now().toString(),
        name,
        amount,
        date
    };

    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    addExpenseToList(expense);
    updateTotal();

    // Clear form fields
    form.reset();
});

// Load existing expenses from localStorage
document.addEventListener('DOMContentLoaded', renderExpenses);
