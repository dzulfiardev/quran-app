// SELECTOR INDEX
const title = document.querySelector('.title');
const number = document.querySelector('.number');
const surah = document.querySelector('.surah');
const subSurah = document.querySelector('.surah-sub');
const judulArab = document.querySelector('.judul-arab');
const surahContainer = document.querySelector('.surah-container');

const detailSurah = document.querySelector('.detail-surah');
const quranId = document.querySelector('[data-id]');

const titleArabic = document.querySelector('.title-arabic');

// CONNECT API
const apiSurah = 'http://api.alquran.cloud/v1/quran/en.asad';

loadSurahs();

async function loadSurahs() {
    const list = await fetch(apiSurah);
    const surahData = await list.json();
    const index = surahData.data.surahs;

    title.innerHTML = 'Al-Quran App';

    for (i = 0; i < index.length; i++) {

        const surahNumber = index[i].number;
        const name = index[i].englishName;
        const transName = index[i].englishNameTranslation;
        const arabicTitle = index[i].name;

        const surahCard = document.createElement('div');
        surahCard.classList.add('surah-card');

        surahCard.innerHTML = `
                                <div class="number">${surahNumber}</div>
                                    <a href="#" class="btn" id="${surahNumber}" class="detail-surah" style="text-decoration:none;color:rgb(20,20,20)">
                                        <div class="judul-latin">
                                            <li class="surah">${name}</li>
                                            <li class="surah-sub">${transName}</li>
                                        </div>
                                    </a>    
                                <div id="judul-arab" class="judul-arab">${arabicTitle}</div>
                              `
            ;

        surahContainer.appendChild(surahCard);

        surahCard.addEventListener('click', async function () {

            const panel = document.querySelector('.panel');
            title.innerHTML = `Surah ${name}`;
            panel.innerHTML = `
                                <li class="title-arabic">( ${arabicTitle} )</li>
                                <li><a href="" type="button">Back</a></li>`;

            surahContainer.innerHTML = '';

            const apiTranslation = await fetch(`http://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`);
            const translation = await apiTranslation.json();

            const api = await fetch(`http://api.alquran.cloud/v1/surah/${surahNumber}`);
            const surah = await api.json();
            const indexSurah = surah.data.ayahs;


            for (i = 0; i < indexSurah.length; i++) {

                const noAyat = indexSurah[i].numberInSurah;
                const ayat = indexSurah[i].text;
                const translationText = translation.data.ayahs[i].text;


                const containerContent = document.createElement('div');
                containerContent.classList.add('container-content');

                containerContent.innerHTML = `              
                                                <div class="container-ayat">
                                                    <div class="no-ayat">${noAyat}</div>
                                                    <div class="ayat">${ayat}</div>
                                                </div>
                                                <div class="translation">
                                                    ${translationText}
                                                </div>  
                                                <hr>
                                                
                                            `;

                surahContainer.appendChild(containerContent);
            }

        });

    }


}

