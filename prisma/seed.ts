import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed(){
    await prisma.history.deleteMany()
    await prisma.task.deleteMany()
    await prisma.state.deleteMany()
    await prisma.subTypeTask.deleteMany()
    await prisma.typeTask.deleteMany()

    const openState = await prisma.state.create({
        data: {
            idState: 1,
            descriptionState: 'Aberto',
            isActive: true
        }
    })

    const inProgressState = await prisma.state.create({
        data: {
            idState: 2,
            descriptionState: 'Em andamento',
            isActive: true
        }
    })

    const closedState = await prisma.state.create({
        data: {
            idState: 3,
            descriptionState: 'Concluído',
            isActive: true
        }
    })

    const typeTaskBug = await prisma.typeTask.create({
        data: {
            idTypeTask: 1,
            descriptionTypeTask: 'Bug',
            idSubTypeTask: {
                create: [{
                    idSubTypeTask: 1,
                    descriptionSubTypeTask: 'Bug Portal',
                    isActive: true
                },{
                    idSubTypeTask: 2,
                    descriptionSubTypeTask: 'Bug Teams',
                    isActive: true
                },{
                    idSubTypeTask: 3,
                    descriptionSubTypeTask: 'Bug Discord',
                    isActive: true
                },{
                    idSubTypeTask: 4,
                    descriptionSubTypeTask: 'Bug Slack',
                    isActive: true
                }]
            },
            isActive: true
        }
    })

    const typeTaskFeature = await prisma.typeTask.create({
        data: {
            idTypeTask: 2,
            descriptionTypeTask: 'Feature',
            idSubTypeTask: {
                create: {
                    idSubTypeTask: 5,
                    descriptionSubTypeTask: 'Feature',
                    isActive: true
                }
            },
            isActive: true
        }
    })

    const typeTaskQuestion = await prisma.typeTask.create({
        data: {
            idTypeTask: 3,
            descriptionTypeTask: 'Question',
            idSubTypeTask: {
                create: {
                    idSubTypeTask: 6,
                    descriptionSubTypeTask: 'Question IRON',
                    isActive: true
                }
            },
            isActive: true
        }
    })
    const typeTaskInfrastructure = await prisma.typeTask.create({
        data: {
            idTypeTask: 4,
            descriptionTypeTask: 'Infrastructure',
            idSubTypeTask: {
                create: {
                    idSubTypeTask: 7,
                    descriptionSubTypeTask: 'Infrastructure IBM Portal',
                    isActive: true
                }
            },
            isActive: true
        }
    })

    const typeTaskEquipment = await prisma.typeTask.create({
        data: {
            idTypeTask: 5,
            descriptionTypeTask: 'Equipment',
            idSubTypeTask: {
                create: {
                    idSubTypeTask: 8,
                    descriptionSubTypeTask: 'Equipment LAptop',
                    isActive: true
                }
            },
            isActive: true
        }
    })


}


seed().then(() => {
   console.log('Done')
})