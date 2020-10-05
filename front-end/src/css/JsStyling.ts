export const JsFooterStyling = () => {
    if( window.innerWidth !== undefined ) {
        if(window.innerWidth < 1200) {
            if( document!.getElementById('backBtn') ) {
                document!.getElementById('backBtn')!.classList.add('hide');
                document!.getElementById('deleteBtn')!.classList.remove('center');
                document!.getElementById('deleteBtn')!.classList.add('left');
                document!.getElementById('deleteBtn')!.classList.add('btn-ex-40');
                document!.getElementById('submitBtn')!.classList.add('btn-ex-40');
            }

        }
        if(window.innerWidth > 1200) {
            if( document!.getElementById('backBtn') ) {
                document!.getElementById('backBtn')!.classList.remove('hide');
                document!.getElementById('deleteBtn')!.classList.add('center');
                document!.getElementById('deleteBtn')!.classList.remove('left');
                document!.getElementById('deleteBtn')!.classList.remove('btn-ex-40');
                document!.getElementById('submitBtn')!.classList.remove('btn-ex-40');
            }
        }
    }
}