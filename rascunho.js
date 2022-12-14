const renderJobs = (array) => {
    const container = document.querySelector('.jobs__container')

    array.forEach((job) => {
        container.appendChild(createJobs(job))
    })
}

const createJobs = (array) => {
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
    button.dataset.id = array.id
    button.innerText = 'Candidatar'

    div.append(subTitle, city)
    container.append(title, div, descrition, type, button)

    return container
}

const renderSelectedJobs = (array) => {
    const container = document.querySelector('.selected-jobs__container')

    container.innerHTML = ''

    if(selectedJobs.length <= 0){
        container.appendChild(createEmptyJobs())
    }

    else {
        array.forEach((job) => {
            const selectedJob = creatSelectedJob(job)
    
            container.appendChild(selectedJob)

            removeJob(array)
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

const creatSelectedJob = (array) => {
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
    button.dataset.id = array.id

    div.append(subTitle, city)
    container.append(title, div, button)

    return container
}

const addSelectedJobs = () => {
    const buttons = document.querySelectorAll('.subscribe')

    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            
            const jobFound = jobsData.find((job) => {
                return job.id == Number(event.target.dataset.id)
            })
            const newJobs = {
                ...jobFound,
                addId: selectedJobs.length + 1
            }
            
            selectedJobs.push(newJobs)

            renderSelectedJobs(selectedJobs)

        })
    })
}

const removeJob = (array) => {
    const removeBtns = document.querySelectorAll('.remove-button')

    removeBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const jobSelected = array.find((job) => {
                return job.id == Number(event.target.id)
            })

            const jobIndex = array.indexOf(jobSelected)

            array.splice(jobIndex, 1)

            renderSelectedJobs(array)
        })
    })
}

renderJobs(jobsData)

renderSelectedJobs(selectedJobs)

addSelectedJobs()