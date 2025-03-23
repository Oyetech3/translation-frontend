import React, { useEffect } from 'react'
import countries from './data'
import './App.css'

function WordTrans() {
    useEffect(() => {
        const fromText = document.getElementById('w1');
        const toText = document.getElementById('w2');
        const translateBtn = document.getElementById('translate');
        const clearBtn = document.getElementById('clear');
        const selectFromLang = document.getElementById('lang');
        const selectToLang = document.getElementById('lang2');

        
        const populateLanguages = (selectElement, defaultLang) => {
            for(let countryCode in countries) {
                const option = document.createElement('option')
                option.value = countryCode
                option.textContent = countries[countryCode]
                if(countryCode === defaultLang) {
                    option.selected = true
                }
               selectElement.appendChild(option)
            }
        };

        populateLanguages(selectFromLang, 'en'); 
        populateLanguages(selectToLang, 'es'); 

        
        clearBtn.addEventListener('click', () => {
            fromText.value = '';
            toText.value = '';
        });

        
        translateBtn.addEventListener('click', async () => {
            const text = fromText.value.trim();
            const translateFrom = selectFromLang.value;
            const translateTo = selectToLang.value;

            const apiUrl = "https://text-translation-82x6r5qry-oyetech.vercel.app/api/translate"

            if (!text) {
                alert('Please enter text to translate.');
                return;
            }

            toText.setAttribute('placeholder', 'Translating...');
            try {
                const response = await fetch(
                    `${apiUrl}?text=${encodeURIComponent(text)}&source=${translateFrom}&target=${translateTo}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const translatedText = await response.text();
                toText.value = translatedText;
                toText.setAttribute('placeholder', 'Translation');
            } catch (error) {
                console.error('Fetch error:', error);
                toText.setAttribute('placeholder', 'Error in translation');
            }
        });
    }, [])

  return (
    <div className='allcon'>
        <h2>Word Translation</h2>

        <div className='choose'>
            <div className='firstlang'>
                
                <select id='lang'>
                    <option value='en'>English</option>
                </select>
            </div>
            <div className='secondlang'>
                
                <select id='lang2'>
                    <option value='es'>Spanish</option>
                </select>
            </div>
        </div>

        <div className='word'>
            <div className='firstinput'>
                <textarea id='w1' placeholder='Enter Word'></textarea>
            </div>
            <div className='secondinput'>
                <textarea id='w2' placeholder='Translation' readOnly></textarea>
            </div>
        </div>

        <div className='buttons'>
            <button id='translate'>Translate</button>
            <button id='clear'>Clear</button>   
        </div>
    </div>
  )
}

export default WordTrans