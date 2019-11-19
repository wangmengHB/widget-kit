import { ProgressBar } from '../ui/progressbar/progressbar';


const container1 = document.createElement('div');
document.body.appendChild(container1);

let p = new ProgressBar(container1);


(window as any)._p = p;



