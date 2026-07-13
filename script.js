const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

const setMenuState = (open) => {
  menuToggle?.setAttribute('aria-expanded', String(open));
  nav?.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
};

menuToggle?.addEventListener('click', () => {
  const next = menuToggle.getAttribute('aria-expanded') !== 'true';
  setMenuState(next);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('is-visible');
});

const calculator = {
  orderValue: document.querySelector('#order-value'),
  extraOrders: document.querySelector('#extra-orders'),
  busyDays: document.querySelector('#busy-days'),
  orderValueOutput: document.querySelector('#order-value-output'),
  extraOrdersOutput: document.querySelector('#extra-orders-output'),
  busyDaysOutput: document.querySelector('#busy-days-output'),
  monthlySales: document.querySelector('#monthly-sales'),
  grossProfit: document.querySelector('#gross-profit'),
  revenueMultiple: document.querySelector('#revenue-multiple'),
  groupsServed: document.querySelector('#groups-served')
};

const formatCurrency = (value) => new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0
}).format(value);

const updateRangeFill = (input) => {
  const min = Number(input.min);
  const max = Number(input.max);
  const value = Number(input.value);
  const progress = ((value - min) / (max - min)) * 100;
  input.style.setProperty('--range-progress', `${progress}%`);
};

const updateCalculator = () => {
  if (!calculator.orderValue || !calculator.extraOrders || !calculator.busyDays) return;

  const orderValue = Number(calculator.orderValue.value);
  const extraOrders = Number(calculator.extraOrders.value);
  const busyDays = Number(calculator.busyDays.value);
  const subscriptionPrice = 199;
  const grossMargin = 0.65;
  const groupsPerBusyDay = 30;

  const monthlySales = orderValue * extraOrders * busyDays;
  const grossProfit = monthlySales * grossMargin;
  const revenueMultiple = monthlySales / subscriptionPrice;
  const groupsServed = groupsPerBusyDay * busyDays;

  calculator.orderValueOutput.textContent = formatCurrency(orderValue);
  calculator.extraOrdersOutput.textContent = String(extraOrders);
  calculator.busyDaysOutput.textContent = String(busyDays);
  calculator.monthlySales.textContent = formatCurrency(monthlySales);
  calculator.grossProfit.textContent = formatCurrency(grossProfit);
  calculator.revenueMultiple.textContent = `${revenueMultiple.toFixed(1)}x`;
  calculator.groupsServed.textContent = new Intl.NumberFormat('en-CA').format(groupsServed);

  [calculator.orderValue, calculator.extraOrders, calculator.busyDays].forEach(updateRangeFill);
};

document.querySelectorAll('[data-calc-input]').forEach((input) => {
  input.addEventListener('input', updateCalculator);
});

const scenarios = [
  { orderValue: 24, extraOrders: 2, busyDays: 12 },
  { orderValue: 30, extraOrders: 4, busyDays: 16 },
  { orderValue: 42, extraOrders: 6, busyDays: 20 }
];
let scenarioIndex = 1;

document.querySelectorAll('[data-scenario]').forEach((button) => {
  button.addEventListener('click', () => {
    scenarioIndex = button.dataset.scenario === 'next'
      ? (scenarioIndex + 1) % scenarios.length
      : (scenarioIndex - 1 + scenarios.length) % scenarios.length;

    const nextScenario = scenarios[scenarioIndex];
    calculator.orderValue.value = String(nextScenario.orderValue);
    calculator.extraOrders.value = String(nextScenario.extraOrders);
    calculator.busyDays.value = String(nextScenario.busyDays);
    updateCalculator();
  });
});

updateCalculator();

const form = document.querySelector('#demo-form');
const formStatus = document.querySelector('#form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const requiredFields = ['firstName', 'lastName', 'courseName', 'email'];
  let valid = true;

  requiredFields.forEach((name) => {
    const field = form.elements.namedItem(name);
    const empty = !String(formData.get(name) || '').trim();
    const invalidEmail = name === 'email' && !/^\S+@\S+\.\S+$/.test(String(formData.get(name) || ''));
    const invalid = empty || invalidEmail;
    field?.setAttribute('aria-invalid', String(invalid));
    if (invalid) valid = false;
  });

  if (!valid) {
    formStatus.textContent = 'Please complete the required fields before submitting.';
    return;
  }

  const fullName = `${formData.get('firstName')} ${formData.get('lastName')}`.trim();
  const subject = `Gimme demo request — ${formData.get('courseName')}`;
  const body = [
    'New Gimme demo request',
    '',
    `Name: ${fullName}`,
    `Course: ${formData.get('courseName')}`,
    `Email: ${formData.get('email')}`,
    `Province / State: ${formData.get('region') || 'Not provided'}`,
    '',
    'Message:',
    formData.get('message') || 'No message provided.'
  ].join('\n');

  formStatus.textContent = 'Opening your email app…';
  window.location.href = `mailto:info@gimmedelivery.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelectorAll('#demo-form input, #demo-form textarea').forEach((field) => {
  field.addEventListener('input', () => field.removeAttribute('aria-invalid'));
});

document.querySelector('#year').textContent = new Date().getFullYear();
