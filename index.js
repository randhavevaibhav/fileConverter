function openTab(tabName)
    {
      switch(tabName)
      {
        case 'PDFToWord':
        window.open("https://www.ilovepdf.com/pdf_to_word", "_self");
          break;
        case 'WordToPDF':
        window.open("https://www.ilovepdf.com/word_to_pdf", "_self");
          break;
        case 'PDFCompressor':
        window.open("https://www.ilovepdf.com/compress_pdf", "_self");
          break;
          case 'IMGCompressor':
        window.open("https://www.iloveimg.com/compress-image", "_self");
          break;
          default:  alert(tabName+" is not a valid tab name !!");
      }
    }
    let buttonData = []; // Initialize an empty array for button data
    function addButton() {
        const buttonContainer = document.getElementById('buttonContainer');
        const newButton = document.createElement('button');
        newButton.textContent = 'New Button';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-container';
        buttonDiv.appendChild(checkbox);
        buttonDiv.appendChild(newButton);

        buttonContainer.appendChild(buttonDiv);

        // Add button information to the array
        buttonData.push({ buttonText: 'New Button', isChecked: false });

        // Save button data to local storage
        saveButtonDataToLocalStorage();

        // Add an event listener to the new button for deletion
        newButton.addEventListener('click', function() {
            selectButton(checkbox);
        });
    }

    // Function to select a button for deletion
    function selectButton(checkbox) {
        checkbox.checked = !checkbox.checked;
    }

    // Function to delete the selected buttons
    function deleteButton() {
        const buttonDivs = document.querySelectorAll('.button-container');
        buttonDivs.forEach(function(buttonDiv, index) {
            const checkbox = buttonDiv.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                buttonDiv.remove();
                // Remove the corresponding button data from the array
                buttonData.splice(index, 1);
            }
        });

        // Save the updated button data to local storage
        saveButtonDataToLocalStorage();
    }

    // Function to save button data to local storage
    function saveButtonDataToLocalStorage() {
        localStorage.setItem('buttonData', JSON.stringify(buttonData));
    }

    // Function to load button data from local storage
    function loadButtonDataFromLocalStorage() {
        const savedData = localStorage.getItem('buttonData');
        if (savedData) {
            buttonData = JSON.parse(savedData);

            // Create buttons from loaded data
            const buttonContainer = document.getElementById('buttonContainer');
            buttonData.forEach(function(data) {
                const newButton = document.createElement('button');
                newButton.textContent = data.buttonText;

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = data.isChecked;

                const buttonDiv = document.createElement('div');
                buttonDiv.className = 'button-container';
                buttonDiv.appendChild(checkbox);
                buttonDiv.appendChild(newButton);

                buttonContainer.appendChild(buttonDiv);

                // Add an event listener to the new button for deletion
                newButton.addEventListener('click', function() {
                    selectButton(checkbox);
                });
            });
        }
    }

    // Load button data from local storage on page load
    loadButtonDataFromLocalStorage();

    // Add event listeners to the Add and Delete buttons
    document.getElementById('addButton').addEventListener('click', addButton);
    document.getElementById('deleteButton').addEventListener('click', deleteButton);
