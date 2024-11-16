const tipSelectBtn = document.querySelector("[data-tip-select-btn]");
const resetBtn = document.querySelector(".tip__total-reset__btn");
const tipSelectInput = tipSelectBtn.nextElementSibling;
const tipSelectItems = document.querySelectorAll(".tip__select-item input");

const tipBillInput = document.querySelector("[data-tip-input]");
const peopleInput = document.querySelector("[data-tip-people]");
const tipTotalNumber = document.querySelector("[data-tip-num]");
const totalNum = document.querySelector("[data-tip-total]");

document.addEventListener("click", (event) => {
  if (event.target === tipSelectBtn) {
    selectCustomTip();
  } else if (!event.target.closest(".tip__select-custom")) {
    tipSelectInput.classList.add("hidden");
    tipSelectBtn.classList.remove("hidden");
  }
});

resetBtn.addEventListener("click", () => {
  tipTotalNumber.textContent = formatCurrency(0);
  totalNum.textContent = formatCurrency(0);
});

document.addEventListener("input", calculateTip);

function selectCustomTip() {
  tipSelectInput.classList.remove("hidden");
  tipSelectInput.focus();

  tipSelectBtn.classList.add("hidden");

  tipSelectItems.forEach((tipSelectItem) => (tipSelectItem.checked = false));
}

function calculateTipPerPerson(totalBill, peopleCount, percent) {
  const perPerson = totalBill / peopleCount;
  return {
    tip: (perPerson * percent) / 100,
    total: perPerson + (perPerson * percent) / 100,
  };
}

function calculateTip() {
  const bill = tipBillInput.value;
  const people = peopleInput.value;
  let percentValue = tipSelectInput.value;

  for (const item of tipSelectItems) {
    if (item.checked) {
      percentValue = parseFloat(item.nextElementSibling.innerText);
      break;
    }
  }

  if (bill && people && percentValue) {
    const { tip, total } = calculateTipPerPerson(bill, people, percentValue);

    tipTotalNumber.textContent = formatCurrency(tip);
    totalNum.textContent = formatCurrency(total);
  }
}

function formatCurrency(val) {
  return new Intl.NumberFormat("us-US", { style: "currency", currency: "USD" }).format(val);
}
