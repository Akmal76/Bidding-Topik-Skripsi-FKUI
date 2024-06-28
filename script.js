// ==UserScript==
// @name         Auto-fill Form
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto-fill Bidding Topik Skripsi FKUI
// @author       AMC76
// @match        *://forms.zohopublic.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Script ini dibuat berdasarkan form yang sudah ada sebelumnya.

    // Inisialisasi Data
    var namaValue = "";
    var emailValue = "";
    var numberValue = "";
    var labels = ['', '', ''];

    // -------------------- SCRIPT -----------------------
    window.addEventListener('load', function () {
        // Nama
        var nameDropdown = document.querySelectorAll('select')[0];
        if (nameDropdown) {
            var options = nameDropdown.options;
            for (var i = 0; i < options.length; i++) {
                if (options[i].text === namaValue) {
                    options[i].selected = true;
                    nameDropdown.dispatchEvent(new Event('change', { bubbles: true }));
                    break;
                }
            }
        }

        // Email
        var emailField = document.querySelector('input[name="Email"]');
        if (emailField) {
            emailField.value = emailValue;
            emailField.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // NPM
        var npmField = document.querySelector('input[name="Number"]');
        if (npmField) {
            npmField.value = numberValue;
            npmField.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // Kode & Keyword

        // Fungsi untuk memilih opsi
        function selectOptionByLabel(dropdown, label) {
            var optgroups = dropdown.getElementsByTagName('optgroup');
            for (var j = 0; j < optgroups.length; j++) {
                if (optgroups[j].label === label) {
                    var options = optgroups[j].getElementsByTagName('option');
                    if (options.length > 0) {
                        options[0].selected = true;
                        dropdown.dispatchEvent(new Event('change', { bubbles: true }));
                        return true;
                    }
                }
            }
            return false;
        }

        // Ambil semua dropdown
        var dropdowns = document.querySelectorAll('select');
        var filteredDropdowns = [];

        // Ambil dropdown yang memiliki label judul bidding dan diawali dengan nama 'Dropdown'
        dropdowns.forEach(function(dropdown) {
            if (selectOptionByLabel(dropdown, labels[0]) && dropdown.name.startsWith('Dropdown')) {
                filteredDropdowns.push(dropdown);
            }
        });

        // Iterasi dropdown yang sudah difilter selama tiga kali
        for (i = 0; i < 3; i++) {
            var dropdown = filteredDropdowns[i*2];
            var label = labels[i];
            selectOptionByLabel(dropdown, label);
        }

        // Opsional: Langsung submit. Saran: Jangan pake, cek manual dulu dan submit manual juga.
        // document.querySelector('form').submit();
    }, false);
})();
