const selectedToLocalStorage = []
const toLocalStorage = () => {
    const buttons = document.querySelectorAll('.subscribe')

    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            
            const jobFound = selectedJobs.find((job) => {
                return job.id === Number(event.target.dataset.id)
            })
            if(selectedToLocalStorage.includes(jobFound)){
                /* Não fazer nada */
            }
            else{
                selectedToLocalStorage.push(jobFound)
                localStorage.setItem('@webWoman: selectedJobs', JSON.stringify(selectedToLocalStorage))
                
            }

           
        })
    })
}


