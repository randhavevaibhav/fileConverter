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

    // Function to add a new button with a checkbox
    function addButton() {
        const buttonContainer = document.getElementById('buttonContainer');
        const newButton = document.createElement('button');
        newButton.textContent = 'New Button';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.style.marginLeft = '10px';
        editButton.disabled = true;

        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-container';
        buttonDiv.appendChild(checkbox);
        buttonDiv.appendChild(newButton);
        buttonDiv.appendChild(editButton);

        buttonContainer.appendChild(buttonDiv);

        // Add button information to the array
        buttonData.push({ buttonText: 'New Button', isChecked: false, url: '' });

        // Save button data to local storage
        saveButtonDataToLocalStorage();

        // Add an event listener to the new button for deletion
        newButton.addEventListener('click', function() {
            selectButton(checkbox);
        });

        // Add an event listener to the checkbox to enable/disable the edit button
        checkbox.addEventListener('change', function() {
            editButton.disabled = !checkbox.checked;
        });

        // Add an event listener to the edit button
        editButton.addEventListener('click', function() {
            editButtonDetails(checkbox, newButton);
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
            buttonData.forEach(function(data, index) {
                const newButton = document.createElement('button');
                newButton.textContent = data.buttonText;

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = data.checked;

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.style.marginLeft = '10px';
                if (!data.checked) {
                    editButton.disabled = true;
                }

                const buttonDiv = document.createElement('div');
                buttonDiv.className = 'button-container';
                buttonDiv.appendChild(checkbox);
                buttonDiv.appendChild(newButton);
                buttonDiv.appendChild(editButton);

                buttonContainer.appendChild(buttonDiv);

                // Add an event listener to the new button for deletion
                newButton.addEventListener('click', function() {
                    selectButton(checkbox);
                    editButton.disabled = !checkbox.checked;
                    openNewTab(data,newButton);
                });

                // Add an event listener to the checkbox to enable/disable the edit button
                checkbox.addEventListener('click', function() {
                    editButton.disabled = !checkbox.checked;
                });

                // Add an event listener to the edit button
                editButton.addEventListener('click', function() {
                    editButtonDetails(checkbox, data, newButton);
                });
            });
        }
    }


    function openNewTab(data,newButton)
    {
        if(data.url!="")
        {

            newButton.onclick = function() {
                window.open(data.url, '_self');
            };
    


        }
       
    }

    // Function to edit button details
    function editButtonDetails(checkbox, data, button) {
        if (data) {
            const newName = prompt('Enter the new button name:', data.buttonText);
            const newURL = prompt('Enter the URL for the button:', data.url);

            if (newName !== null && newURL !== null) {
                data.buttonText = newName;
                data.url = newURL;

                if (button) {
                    button.textContent = newName;
                    button.onclick = function() {
                        window.open(newURL, '_blank');
                    };
                }

                // Save the updated button data to local storage
                saveButtonDataToLocalStorage();
            }
        }
    }

    // Load button data from local storage on page load
    loadButtonDataFromLocalStorage();

    // Add event listeners to the Add and Delete buttons
    document.getElementById('addButton').addEventListener('click', addButton);
    document.getElementById('deleteButton').addEventListener('click', deleteButton);