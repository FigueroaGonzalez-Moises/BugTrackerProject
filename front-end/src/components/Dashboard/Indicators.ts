export const changeIndicatorC = (i: string, color: string) => {
    let t = document.getElementById(`ul${i}`);
    t?.classList.remove('indicator-pink');
    t?.classList.remove('indicator-darkblue');
    t?.classList.remove('indicator-cyan');
    switch (color) {
        case 'pink': {
            t?.classList.add('indicator-pink');
            break;
        }
        case 'dark-blue': {
            t?.classList.add('indicator-darkblue');
            break;
        }
        case 'cyan': {
            t?.classList.add('indicator-cyan');
            break;
        }
    }
}

export const changeIndicatorT = (i: string, color: string) => {
    let t = document.getElementById(`ul2${i}`);
    let subt = document.getElementById(`sub-tab2${i}`);
    let subt2 = document.getElementById(`sub-tab2.1${i}`);
    t?.classList.remove('indicator-blue')
    t?.classList.remove('indicator-yellow')
    switch (color) {
        case 'yellow': {
            t?.classList.add('indicator-yellow');
            subt?.classList.add('indicator-blue');
            break;
        }
        case 'blue': {
            t?.classList.add('indicator-blue');
            subt2?.classList.add('indicator-yellow');
            break;
        }
    }
}

// export const changeIndicatorP = (i: string, color: string) => {
//     let t = document.getElementById(`ul3${i}`)
//     let subt = document.getElementById(`sub-tab3${i}`);
//     let subt2 = document.getElementById(`sub-tab3.1${i}`);
//     t?.classList.remove('indicator-orange');
//     t?.classList.remove('indicator-blue');
//     switch (color) {
//         case 'orange': {
//             t?.classList.add('indicator-orange');
//             subt?.classList.add('indicator-blue');
//             break;
//         }
//         case 'blue': {
//             t?.classList.add('indicator-blue');
//             subt2?.classList.add('indicator-orange');
//             break;
//         }
//     }
// }