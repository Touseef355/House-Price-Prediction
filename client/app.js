const SERVER_URL = 'https://touseefahmedpythonanywhere.pythonanywhere.com';

let selectedBhk = 2;
let selectedBath = 2;

function setupToggle(groupId, onSelect) {
    const group = document.getElementById(groupId);
    group.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            onSelect(parseInt(btn.dataset.value));
        });
    });
}

setupToggle('bhk-group', val => selectedBhk = val);
setupToggle('bath-group', val => selectedBath = val);

async function loadLocations() {
    try {
        const res = await fetch(`${SERVER_URL}/get_location_names`);
        const data = await res.json();
        const select = document.getElementById('location');
        select.innerHTML = '<option value="">Select a location</option>';
        data.locations.forEach(loc => {
            const opt = document.createElement('option');
            opt.value = loc;
            opt.textContent = loc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            select.appendChild(opt);
        });
    } catch {
        document.getElementById('location').innerHTML = '<option value="">Could not load locations</option>';
    }
}

/**
 * Formats the price (given in Lakhs) into three displays:
 *  - Primary:  "₹1.72 Cr" or "₹85.50 L"  (most natural short form)
 *  - In Lakhs: "₹1.72 Lakhs"
 *  - In Crores:"₹0.17 Crores"
 *  - Full:     "₹17,24,300"  (Indian locale)
 */
function formatPrice(lakhs) {
    const rupees = lakhs * 100000; // 1 Lakh = 1,00,000

    // Primary display: use Crores if >= 100 Lakhs, else Lakhs
    let primary;
    if (lakhs >= 100) {
        const crores = lakhs / 100;
        primary = '₹' + crores.toFixed(2) + ' Cr';
    } else {
        primary = '₹' + lakhs.toFixed(2) + ' L';
    }

    // Lakhs value
    const inLakhs = '₹' + lakhs.toFixed(2) + ' L';

    // Crores value
    const inCrores = '₹' + (lakhs / 100).toFixed(2) + ' Cr';

    // Full Indian number format (e.g. ₹17,24,300)
    const inFull = '₹' + Math.round(rupees).toLocaleString('en-IN');

    return { primary, inLakhs, inCrores, inFull };
}

async function predictPrice() {
    const sqft = document.getElementById('sqft').value;
    const location = document.getElementById('location').value;
    const errorBox = document.getElementById('error-box');
    const resultBox = document.getElementById('result-box');
    const btn = document.getElementById('predict-btn');

    errorBox.classList.remove('visible');
    resultBox.classList.remove('visible');

    if (!sqft || Number(sqft) < 100) {
        showError('Please enter a valid area (minimum 100 sq ft).');
        return;
    }
    if (!location) {
        showError('Please select a location.');
        return;
    }

    btn.classList.add('loading');
    btn.innerHTML = '<span class="spinner"></span>Calculating...';

    try {
        const formData = new FormData();
        formData.append('total_sqft', sqft);
        formData.append('location', location);
        formData.append('bhk', selectedBhk);
        formData.append('bath', selectedBath);

        const res = await fetch(`${SERVER_URL}/predict_home_price`, {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        const lakhs = data.estimated_price;
        const { primary, inLakhs, inCrores, inFull } = formatPrice(lakhs);

        document.getElementById('result-primary').textContent = primary;
        document.getElementById('val-lakhs').textContent   = inLakhs;
        document.getElementById('val-crores').textContent  = inCrores;
        document.getElementById('val-full').textContent    = inFull;

        resultBox.classList.add('visible');

    } catch {
        showError('Could not connect to the server. Please try again.');
    } finally {
        btn.classList.remove('loading');
        btn.innerHTML = 'Estimate Price';
    }
}

function showError(msg) {
    const box = document.getElementById('error-box');
    box.textContent = msg;
    box.classList.add('visible');
}

loadLocations();