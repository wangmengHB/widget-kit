import { Button, ButtonGroup } from '../ui/button/button';
const container1 = document.createElement('div');
container1.style.background = '#000';
document.body.appendChild(container1);

const button1 = new Button(container1, { title: true, buttonBackground: undefined, buttonHoverBackground: undefined});
const button2 = new Button(container1);

button1.label = 'button1';
button1.element.classList.add('settings-new-extensions-button');

button2.label = 'button2';
button2.element.classList.add('settings-new-extensions-button');

const primaryActions = [
  {label: 'test1'},
  {label: 'test2'},
  {label: 'test3'},
];

const buttonGroup = new ButtonGroup(container1, primaryActions.length, { title: true});
buttonGroup.buttons.forEach((button, index) => {
  const action = primaryActions[index];
  button.label = action.label;
});


(window as any)._btn = button1;