#!/usr/bin/env node

'use-strict'

import fetch from 'isomorphic-fetch'
import FormData from 'form-data'

const argv = require('yargs')
    .alias('n', 'number')
    .alias('h', 'help')
    .usage('Usage: $0 -n [num] -h')
    .help('h')
    .demandOption(['n'])
    .argv,
    urlWs = 'http://suivi-des-incidents.orange.fr/soli/soli_ajax.php'

if(argv.number != undefined) {
    let formIncident = new FormData()
    formIncident.append('operation', 'incidentslocaux')
    formIncident.append('nd', `0${argv.number}`)
    formIncident.append('idPage', 'resultat')

    console.log(`check 0${argv.number} ...`)

    fetch(urlWs, { method: 'POST', body: formIncident }).then((res) => res.json())
        .then((json) => {
            json.response.services.map((service) => {
                console.log(`${service.libelle} - ${service.statut}`)
            })
        })
        .catch((err) => console.log(`err: ${err}`))
}