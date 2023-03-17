(()=>{
    //Variables
    let baseURL = 'http://localhost:3005/api/';
    let tbodyExistencia = document.getElementById('tbodyExistencia');
    let allDataProduct;

    function renderizarTable(){
        try {
            fetch( `${baseURL}product`)
            .then(res=>{
                if(res.status >= 400) throw new Error('Error')
                return res.json();
            })
            .then(res=>{
                allDataProduct = res;
                console.log(res);
                for(let key in res){
                    let row = document.createElement('div');
                    row.classList.add('tr-cuerpo');
                    row.setAttribute('data-key', key);
                    let td = `
                                <div class="td-cuerpo">${res[key].id}</div>
                                <div class="td-cuerpo">${res[key].barcode}</div>
                                <div class="td-cuerpo">${res[key].article}</div>
                                <div class="td-cuerpo">${res[key].price}</div>
                                <div class="td-cuerpo"><input class="input-table" item="${key}" value="${res[key].cantidad}" type="text" /></div>
                                `;
                    row.insertAdjacentHTML('beforeend', td);
                    tbodyExistencia.insertAdjacentElement('beforeend', row)
                    tbodyExistencia.style.height = 'auto';
                    tbodyExistencia.style.overflow = 'auto';
                }
            })
        } catch (error) {
            
        }
    }
    renderizarTable();

    document.addEventListener('change', function(e){
        if(e.target.matches('.input-table')){
            let key = e.target.parentElement.parentElement.getAttribute('data-key');
            let input = document.querySelector(`input.input-table[item="${key}"]`)
            let idProduct = allDataProduct[key].id
            document.querySelectorAll('.input-table').forEach(result=>result.classList.remove('color-success'));
     
            try {
                fetch(`${baseURL}product/cantidad/${idProduct}`,{
                    method: 'PUT',
                    body: JSON.stringify({"cantidad": Number(input.value)}),
                    headers: {
                        "Content-Type": "application/json",
                    }, 
                })
                .then(res=>{
                    if(res.status >= 400) throw new Error('Error')
                    input.classList.add('color-success');
                })
            } catch (error) {
                
            }


        }
    })
})()