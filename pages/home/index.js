function renderJobs(array){
    const ul = document.querySelector('.jobs__container')

    array.forEach(job => {
        ul.appendChild(createJobs(job))
    })
}

function createJobs(job){
    const container = document.createElement('li')
    const title = document.createElement('h4')
    const div = document.createElement('div')
    const subTitle = document.createElement('span')
    const city = document.createElement('span')
    const descrition = document.createElement('p')
    const type = document.createElement('span')
    const button = document.createElement('button')
    
    container.classList.add('jobs__cards')
    title.innerText = job.title
    subTitle.innerText = job.enterprise
    city.innerText = job.location
    descrition.innerText = job.descrition
    type.innerText = `${job.modalities[0]} e ${job.modalities[1]}`
    button.classList.add('subscribe')
    button.id = job.id
    button.innerText = 'Candidatar'

    button.addEventListener('click', (event) => {
        if(!selectedJobs.includes(job)){
            selectedJobs.push(job)
        }
        
        if(button.innerText == "Candidatar"){
            button.innerText = "Retirar vaga"
            renderSelectedJobs(selectedJobs)
            localStorage.setItem('@webWoman: selectedJobs', JSON.stringify(selectedJobs))
        } else {
            button.innerText = "Candidatar"
            const indexJob = selectedJobs.indexOf(job)
            selectedJobs.splice(indexJob, 1)
            renderSelectedJobs(selectedJobs)
            localStorage.setItem('@webWoman: selectedJobs', JSON.stringify(selectedJobs))
        }
        
    })
    

    div.append(subTitle, city)
    container.append(title, div, descrition, type, button)

    return container
}


function renderSelectedJobs(array){
    const ul = document.querySelector('.selected-jobs__container')
    ul.innerHTML = ''
    if(selectedJobs.length <= 0){
        ul.appendChild(createEmptyJobs())
    }else {
        array.forEach(job => {
            ul.appendChild(createSelectedJobs(job))
        })

    }

}

function createSelectedJobs(job){
    const container = document.createElement('li')
    const title = document.createElement('h4')
    const div = document.createElement('div')
    const subTitle = document.createElement('span')
    const city = document.createElement('span')
    const button = document.createElement('button')

    container.classList.add('jobs-selected__cards')
    title.innerText = job.title
    subTitle.innerText = job.enterprise
    city.innerText = job.location
    button.classList.add('remove-button')
    button.innerText = "Excluir"
    button.id = job.id

    button.addEventListener('click', (event) => {
        const buttonsAdd = document.querySelectorAll('.subscribe')
        buttonsAdd.forEach(button => {
            if(button.id == event.target.id){
                button.innerText = 'Candidatar'
            }
        })

        const indexJob = selectedJobs.indexOf(job)

        selectedJobs.splice(indexJob, 1)

        renderSelectedJobs(selectedJobs)

        localStorage.setItem('@webWoman: selectedJobs', JSON.stringify(selectedJobs))
    })

    div.append(subTitle, city)
    container.append(title, div, button)

    return container
}

const createEmptyJobs = () => {
    const li = document.createElement('li') 
    const p = document.createElement('p')

    li.classList.add('no-jobs-selected')
    p.innerText = "Você não se candidatou a nenhuma vaga"
    li.appendChild(p)

    return li
}

function goSection(){
    const button = document.querySelector('header > button')
    button.addEventListener('click', (event) => {
        window.scrollTo(0, 700)
    })
}

renderJobs(jobsData)
renderSelectedJobs(selectedJobs)
goSection()

