function renderJobs (array) {
    const container = document.querySelector('.jobs__container')
    
    array.forEach((job) => {
        container.appendChild(createJobs(job))
    })
}

function createJobs (array) {
    const container = document.createElement('li')
    const title = document.createElement('h4')
    const div = document.createElement('div')
    const subTitle = document.createElement('span')
    const city = document.createElement('span')
    const descrition = document.createElement('p')
    const type = document.createElement('span')
    const button = document.createElement('button')
    
    container.classList.add('jobs__cards')
    title.innerText = array.title
    subTitle.innerText = array.enterprise
    city.innerText = array.location
    descrition.innerText = array.descrition
    type.innerText = `${array.modalities[0]} e ${array.modalities[1]}`
    button.classList.add('subscribe')
    button.id = array.id
    button.innerText = 'Candidatar'

    button.addEventListener('click', (event) => {
        if(button.innerText == "Candidatar"){
            button.innerText = "Retirar vaga"
            
            if(!selectedJobs.includes(array)){
                selectedJobs.push(array)
            }
            
        }
        else {
            button.innerText = "Candidatar"
            removeJob(selectedJobs, array.id)
        }
        
        if(!selectedToLocalStorage.includes(array)){
            selectedToLocalStorage.push(array)
            localStorage.setItem('@webWoman: selectedJobs', JSON.stringify(selectedToLocalStorage))
            
        }else{
            removeJob(selectedToLocalStorage, array.id)
            localStorage.setItem('@webWoman: selectedJobs', JSON.stringify(selectedToLocalStorage))
        }
        
        
        renderSelectedJobs(selectedJobs)
    })

    div.append(subTitle, city)
    container.append(title, div, descrition, type, button)

    return container
}


function createSelectedJobs(array) {
    const container = document.createElement('li')
    const title = document.createElement('h4')
    const div = document.createElement('div')
    const subTitle = document.createElement('span')
    const city = document.createElement('span')
    const button = document.createElement('button')

    container.classList.add('jobs-selected__cards')
    title.innerText = array.title
    subTitle.innerText = array.enterprise
    city.innerText = array.location
    button.classList.add('remove-button')
    button.innerText = "Excluir"
    button.id = array.id

    button.addEventListener('click', (event) => {
        const buttonsAdd = document.querySelectorAll('.subscribe')
        buttonsAdd.forEach((button => {
            if(button.innerText == "Retirar vaga"){
                button.innerText = "Candidatar"
            }
        }))

        removeJob(selectedJobs, array.id)

        removeJob(selectedToLocalStorage, array.id)

        localStorage.setItem('@webWoman: selectedJobs', JSON.stringify(selectedToLocalStorage))
        
    })

    div.append(subTitle, city)
    container.append(title, div, button)

    return container
    
}

function renderSelectedJobs(array){
    
    const container = document.querySelector('.selected-jobs__container')
    container.innerHTML = ''
    if(array.length <= 0){
        renderEmptyJobs()
    } else{
        array.forEach((element) => {
            container.append(createSelectedJobs(element))
            
        })
    }
}

const createEmptyJobs = () => {
    const li = document.createElement('li') 
    const p = document.createElement('p')

    li.classList.add('no-jobs-selected')
    p.innerText = "Você não se candidatou a nenhuma vaga"
    li.appendChild(p)

    return li
}

function renderEmptyJobs(){
    const container = document.querySelector('.selected-jobs__container')

        container.append(createEmptyJobs())
  
}

const removeJob = (array, id) => {
    const jobSelected = array.find(job => {
        return job.id == id
    })
    const jobIndex = array.indexOf(jobSelected)

    array.splice(jobIndex, jobIndex + 1)
    renderSelectedJobs(array)
}

const goSection = () => {
    const button = document.querySelector('header > button')
    console.log(button)
    button.addEventListener('click', (event) => {
        window.scrollTo(0, 700)
    })
}

renderJobs(jobsData)
renderSelectedJobs(selectedJobs)
goSection()