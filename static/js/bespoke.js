document.addEventListener('DOMContentLoaded', function() {
  // Category tabs
  const catNames = {
    corporate: 'Corporate Wears',
    allseason: 'All Season Outfits',
    prints: 'African Prints',
    abaya: 'Abaya Wears'
  };
  let currentCat = 'corporate';
  
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCat = tab.dataset.cat;
      // reset style selection when category changes
      document.querySelectorAll('.sample-card').forEach(c => c.classList.remove('selected'));
      selectedStyle = null;
      updateSelectedNote();
    });
  });

  // Sample style selection
  let selectedStyle = null;
  const noteEl = document.getElementById('selectedNote');
  
  function updateSelectedNote() {
    noteEl.innerHTML = selectedStyle
      ? 'Selected: <b>' + selectedStyle + '</b> in ' + catNames[currentCat] + ' — front &amp; back reference saved.'
      : 'No style selected yet — tap a sample above.';
  }
  
  document.querySelectorAll('.sample-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.sample-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedStyle = card.dataset.style;
      updateSelectedNote();
    });
  });

  // Fabric dropzone
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const fileChips = document.getElementById('fileChips');
  
  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('keypress', e => {
    if (e.key === 'Enter') fileInput.click();
  });
  
  ['dragover', 'dragenter'].forEach(evt => {
    dropzone.addEventListener(evt, e => {
      e.preventDefault();
      dropzone.classList.add('drag');
    });
  });
  
  ['dragleave', 'drop'].forEach(evt => {
    dropzone.addEventListener(evt, e => {
      e.preventDefault();
      dropzone.classList.remove('drag');
    });
  });
  
  dropzone.addEventListener('drop', e => {
    addFiles(e.dataTransfer.files, fileChips);
  });
  
  fileInput.addEventListener('change', () => {
    addFiles(fileInput.files, fileChips);
  });

  function addFiles(files, container) {
    Array.from(files).forEach(f => {
      const chip = document.createElement('div');
      chip.className = 'file-chip';
      chip.innerHTML = '<span>' + f.name + '</span>';
      const btn = document.createElement('button');
      btn.textContent = '✕';
      btn.setAttribute('aria-label', 'Remove file');
      btn.addEventListener('click', () => chip.remove());
      chip.appendChild(btn);
      container.appendChild(chip);
    });
  }

  // Note attachment
  const attachBtn = document.getElementById('attachBtn');
  const noteFileInput = document.getElementById('noteFileInput');
  const noteFileChips = document.getElementById('noteFileChips');
  
  attachBtn.addEventListener('click', () => noteFileInput.click());
  noteFileInput.addEventListener('change', () => {
    addFiles(noteFileInput.files, noteFileChips);
  });

  // Build WhatsApp message from selections
  const waLink = document.getElementById('waLink');
  
  function buildMessage() {
    const fabricDesc = document.getElementById('fabricDesc').value.trim();
    const notes = document.getElementById('notes').value.trim();
    const collectLoc = document.getElementById('collectLoc').value.trim();
    let msg = "Hi Oladiplenty Stylist Consult, I'd like to place a Custom Order.\n\n";
    msg += "Category: " + catNames[currentCat] + "\n";
    msg += "Style reference: " + (selectedStyle || 'Not selected yet') + "\n";
    if (fabricDesc) msg += "Fabric: " + fabricDesc + "\n";
    if (notes) msg += "Notes: " + notes + "\n";
    if (collectLoc) msg += "Click & Collect: " + collectLoc + "\n";
    return msg;
  }
  
  waLink.addEventListener('click', () => {
    const msg = encodeURIComponent(buildMessage());
    waLink.href = 'https://wa.me/447450207203?text=' + msg;
  });
});
