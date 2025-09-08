/**
 * My Mini Components Library - 7 Simple UI Components
 * I built this using HTML, CSS, JavaScript and Bootstrap
 * This is my learning project to understand how components work
 */

// Component 1: Table Component
// This function creates a table with headers and data rows
// I learned how to use createElement and appendChild to build HTML elements
function createTable(headers, rows) {
    // First, I need to find the container where my table will go
    var tableContainer = document.getElementById('table-container');
    
    // Create the main table element and add Bootstrap classes for styling
    var myTable = document.createElement('table');
    myTable.className = 'table table-striped table-hover table-bordered';
    
    // Create the table header section
    var tableHeader = document.createElement('thead');
    tableHeader.className = 'table-dark';
    var headerRow = document.createElement('tr');
    
    // Loop through each header and create header cells
    // I use a simple for loop because it's easier to understand
    for (var i = 0; i < headers.length; i++) {
        var headerCell = document.createElement('th');
        headerCell.textContent = headers[i];
        headerRow.appendChild(headerCell);
    }
    
    // Add the header row to the table header
    tableHeader.appendChild(headerRow);
    myTable.appendChild(tableHeader);
    
    // Create the table body where all the data goes
    var tableBody = document.createElement('tbody');
    
    // Loop through each row of data
    for (var i = 0; i < rows.length; i++) {
        var dataRow = document.createElement('tr');
        
        // Loop through each cell in the current row
        for (var j = 0; j < rows[i].length; j++) {
            var dataCell = document.createElement('td');
            dataCell.textContent = rows[i][j];
            dataRow.appendChild(dataCell);
        }
        
        // Add the completed row to the table body
        tableBody.appendChild(dataRow);
    }
    
    // Add the body to the main table
    myTable.appendChild(tableBody);
    
    // Wrap the table in a responsive div so it looks good on mobile
    var responsiveWrapper = document.createElement('div');
    responsiveWrapper.className = 'table-responsive fade-in';
    responsiveWrapper.appendChild(myTable);
    
    // Clear out any old content and add my new table
    tableContainer.innerHTML = '';
    tableContainer.appendChild(responsiveWrapper);
}

// Component 2: Form Component  
// This function creates a contact form with validation
// I learned how to create different input types and validate user input
function createForm(fields) {
    // Find the container where my form will be placed
    var formContainer = document.getElementById('form-container');
    
    // Create the main form element
    var myForm = document.createElement('form');
    myForm.className = 'form-container fade-in';
    
    // Add a title to the form
    var formTitle = document.createElement('h4');
    formTitle.textContent = 'Contact Form';
    formTitle.className = 'mb-3';
    myForm.appendChild(formTitle);
    
    // Loop through each field and create form inputs
    for (var i = 0; i < fields.length; i++) {
        var fieldInfo = fields[i];
        
        // Create a container for each form field
        var formGroup = document.createElement('div');
        formGroup.className = 'mb-3';
        
        // Create a label for the input
        var fieldLabel = document.createElement('label');
        fieldLabel.textContent = fieldInfo.label;
        fieldLabel.className = 'form-label';
        fieldLabel.setAttribute('for', 'field-' + i);
        
        // Create different input types based on what we need
        var inputElement;
        if (fieldInfo.type === 'textarea') {
            // Create textarea for longer text
            inputElement = document.createElement('textarea');
            inputElement.rows = 4;
        } else {
            // Create regular input for other types
            inputElement = document.createElement('input');
            inputElement.type = fieldInfo.type;
        }
        
        // Set up the input properties
        inputElement.className = 'form-control';
        inputElement.id = 'field-' + i;
        inputElement.name = fieldInfo.label.toLowerCase().replace(' ', '_');
        inputElement.required = true;
        
        // Add the label and input to the form group
        formGroup.appendChild(fieldLabel);
        formGroup.appendChild(inputElement);
        myForm.appendChild(formGroup);
    }
    
    // Create a submit button
    var submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn btn-primary';
    submitButton.textContent = 'Submit Form';
    myForm.appendChild(submitButton);
    
    // Add form validation when user submits
    myForm.addEventListener('submit', function(event) {
        // Stop the form from submitting normally
        event.preventDefault();
        
        // Check if the form is valid
        var isFormValid = true;
        var allInputs = myForm.querySelectorAll('input, textarea');
        
        // Check each input field
        for (var i = 0; i < allInputs.length; i++) {
            var input = allInputs[i];
            
            // Check if required fields are filled out
            if (input.required && input.value.trim() === '') {
                isFormValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
            
            // Special check for email format
            if (input.type === 'email' && input.value) {
                // Simple email validation pattern
                var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value)) {
                    isFormValid = false;
                    input.classList.add('is-invalid');
                }
            }
        }
        
        // Show success or error message
        if (isFormValid) {
            showAlert('Form submitted successfully!', 'success');
            myForm.reset(); // Clear the form
        } else {
            showAlert('Please fill in all required fields correctly.', 'danger');
        }
    });
    
    // Clear the container and add my new form
    formContainer.innerHTML = '';
    formContainer.appendChild(myForm);
}

// Component 3: Accordion Component
// This function creates a collapsible FAQ-style accordion
// I learned how to use Bootstrap's collapse functionality with data attributes
function createAccordion(items) {
    // Find where I want to put my accordion
    var accordionContainer = document.getElementById('accordion-container');
    
    // Create the main accordion wrapper
    var myAccordion = document.createElement('div');
    myAccordion.className = 'accordion fade-in';
    myAccordion.id = 'faq-accordion';
    
    // Loop through each accordion item and create it
    for (var i = 0; i < items.length; i++) {
        var accItem = items[i];
        
        // Create container for this accordion item
        var itemContainer = document.createElement('div');
        itemContainer.className = 'accordion-item';
        
        // Create the header section with the clickable button
        var itemHeader = document.createElement('h2');
        itemHeader.className = 'accordion-header';
        itemHeader.id = 'heading-' + i;
        
        // Create the button that users click to expand/collapse
        var itemButton = document.createElement('button');
        itemButton.className = 'accordion-button collapsed';
        itemButton.type = 'button';
        itemButton.setAttribute('data-bs-toggle', 'collapse');
        itemButton.setAttribute('data-bs-target', '#collapse-' + i);
        itemButton.textContent = accItem.title;
        
        // Add button to header
        itemHeader.appendChild(itemButton);
        
        // Create the content section that shows/hides
        var itemContent = document.createElement('div');
        itemContent.id = 'collapse-' + i;
        itemContent.className = 'accordion-collapse collapse';
        itemContent.setAttribute('data-bs-parent', '#faq-accordion');
        
        // Create the body where the actual content goes
        var contentBody = document.createElement('div');
        contentBody.className = 'accordion-body';
        contentBody.textContent = accItem.content;
        
        // Put the body inside the content section
        itemContent.appendChild(contentBody);
        
        // Add header and content to the item container
        itemContainer.appendChild(itemHeader);
        itemContainer.appendChild(itemContent);
        
        // Add this item to the main accordion
        myAccordion.appendChild(itemContainer);
    }
    
    // Clear old content and add my new accordion
    accordionContainer.innerHTML = '';
    accordionContainer.appendChild(myAccordion);
}

// Component 4: Modal Popup Component
// This function creates a popup window that appears over the page
// I learned how to use Bootstrap's modal system and event listeners
function openModal(title, content) {
    // First, check if there's already a modal open and remove it
    var existingModal = document.getElementById('dynamic-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create the main modal container
    var myModal = document.createElement('div');
    myModal.className = 'modal fade';
    myModal.id = 'dynamic-modal';
    myModal.setAttribute('tabindex', '-1');
    
    // Create the modal dialog box
    var modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog modal-dialog-centered';
    
    // Create the modal content area
    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Create the header section with title and close button
    var modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    // Add the title
    var modalTitle = document.createElement('h5');
    modalTitle.className = 'modal-title';
    modalTitle.textContent = title;
    
    // Add the X close button
    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close';
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    
    // Put title and close button in header
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    // Create the body section where content goes
    var modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.innerHTML = content;
    
    // Create the footer section with action buttons
    var modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    
    // Add an OK button
    var okButton = document.createElement('button');
    okButton.type = 'button';
    okButton.className = 'btn btn-primary';
    okButton.textContent = 'Got it!';
    okButton.setAttribute('data-bs-dismiss', 'modal');
    
    // Add OK button to footer
    modalFooter.appendChild(okButton);
    
    // Put all the pieces together
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    myModal.appendChild(modalDialog);
    
    // Add the modal to the page
    document.body.appendChild(myModal);
    
    // Show the modal using Bootstrap's JavaScript
    var bootstrapModal = new bootstrap.Modal(myModal);
    bootstrapModal.show();
    
    // Clean up the modal when it's closed
    myModal.addEventListener('hidden.bs.modal', function() {
        myModal.remove();
    });
}

// Component 5: Navbar Component
// This function creates a navigation bar that works on mobile and desktop
// I learned about responsive design and Bootstrap's collapse system
function createNavbar(links) {
    // Find the container for my navbar
    var navbarContainer = document.getElementById('navbar-container');
    
    // Create the main navigation element
    var myNavbar = document.createElement('nav');
    myNavbar.className = 'navbar navbar-expand-lg navbar-dark bg-primary';
    
    // Create a container inside the navbar
    var navContainer = document.createElement('div');
    navContainer.className = 'container';
    
    // Create the brand/logo area
    var navbarBrand = document.createElement('a');
    navbarBrand.className = 'navbar-brand';
    navbarBrand.href = '#';
    navbarBrand.textContent = 'Components Library';
    
    // Create the hamburger button for mobile
    var navbarToggler = document.createElement('button');
    navbarToggler.className = 'navbar-toggler';
    navbarToggler.type = 'button';
    navbarToggler.setAttribute('data-bs-toggle', 'collapse');
    navbarToggler.setAttribute('data-bs-target', '#navbarNav');
    
    // Create the hamburger icon
    var togglerIcon = document.createElement('span');
    togglerIcon.className = 'navbar-toggler-icon';
    navbarToggler.appendChild(togglerIcon);
    
    // Create the collapsible menu area
    var navbarCollapse = document.createElement('div');
    navbarCollapse.className = 'collapse navbar-collapse';
    navbarCollapse.id = 'navbarNav';
    
    // Create the list of navigation links
    var navbarNav = document.createElement('ul');
    navbarNav.className = 'navbar-nav ms-auto';
    
    // Loop through each link and create navigation items
    for (var i = 0; i < links.length; i++) {
        var navLink = links[i];
        
        // Create list item for this link
        var navItem = document.createElement('li');
        navItem.className = 'nav-item';
        
        // Create the actual link
        var navLinkElement = document.createElement('a');
        navLinkElement.className = 'nav-link';
        navLinkElement.href = navLink.url;
        navLinkElement.textContent = navLink.name;
        
        // Make the first link active (highlighted)
        if (i === 0) {
            navLinkElement.classList.add('active');
        }
        
        // Add link to list item, then to navigation list
        navItem.appendChild(navLinkElement);
        navbarNav.appendChild(navItem);
    }
    
    // Add navigation list to collapsible area
    navbarCollapse.appendChild(navbarNav);
    
    // Put everything together
    navContainer.appendChild(navbarBrand);
    navContainer.appendChild(navbarToggler);
    navContainer.appendChild(navbarCollapse);
    myNavbar.appendChild(navContainer);
    
    // Clear old content and add my navbar
    navbarContainer.innerHTML = '';
    navbarContainer.appendChild(myNavbar);
}

// Component 6: Carousel Component
// This function creates an image slideshow with next/previous buttons
// I learned how to work with Bootstrap carousel and image handling
function createCarousel(images) {
    // Find where I want to put my carousel
    var carouselContainer = document.getElementById('carousel-container');
    
    // Create the main carousel wrapper
    var myCarousel = document.createElement('div');
    myCarousel.id = 'image-carousel';
    myCarousel.className = 'carousel slide carousel-container fade-in';
    myCarousel.setAttribute('data-bs-ride', 'carousel');
    
    // Create the dots at the bottom (indicators)
    var carouselIndicators = document.createElement('div');
    carouselIndicators.className = 'carousel-indicators';
    
    // Create indicator dots for each image
    for (var i = 0; i < images.length; i++) {
        var indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#image-carousel');
        indicator.setAttribute('data-bs-slide-to', i.toString());
        
        // Make the first dot active
        if (i === 0) {
            indicator.classList.add('active');
            indicator.setAttribute('aria-current', 'true');
        }
        
        carouselIndicators.appendChild(indicator);
    }
    
    // Create the container where images go
    var carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner';
    
    // Loop through each image and create carousel slides
    for (var i = 0; i < images.length; i++) {
        var imageUrl = images[i];
        
        // Create container for this slide
        var carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        
        // Make the first slide active (visible)
        if (i === 0) {
            carouselItem.classList.add('active');
        }
        
        // Create the image element
        var imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.className = 'd-block w-100';
        imageElement.alt = 'Slide ' + (i + 1);
        
        // Add image to slide, slide to carousel
        carouselItem.appendChild(imageElement);
        carouselInner.appendChild(carouselItem);
    }
    
    // Create the previous button
    var prevControl = document.createElement('button');
    prevControl.className = 'carousel-control-prev';
    prevControl.type = 'button';
    prevControl.setAttribute('data-bs-target', '#image-carousel');
    prevControl.setAttribute('data-bs-slide', 'prev');
    
    // Create the previous arrow icon
    var prevIcon = document.createElement('span');
    prevIcon.className = 'carousel-control-prev-icon';
    var prevText = document.createElement('span');
    prevText.className = 'visually-hidden';
    prevText.textContent = 'Previous';
    
    // Add icon and text to previous button
    prevControl.appendChild(prevIcon);
    prevControl.appendChild(prevText);
    
    // Create the next button
    var nextControl = document.createElement('button');
    nextControl.className = 'carousel-control-next';
    nextControl.type = 'button';
    nextControl.setAttribute('data-bs-target', '#image-carousel');
    nextControl.setAttribute('data-bs-slide', 'next');
    
    // Create the next arrow icon
    var nextIcon = document.createElement('span');
    nextIcon.className = 'carousel-control-next-icon';
    var nextText = document.createElement('span');
    nextText.className = 'visually-hidden';
    nextText.textContent = 'Next';
    
    // Add icon and text to next button
    nextControl.appendChild(nextIcon);
    nextControl.appendChild(nextText);
    
    // Put all the pieces together
    myCarousel.appendChild(carouselIndicators);
    myCarousel.appendChild(carouselInner);
    myCarousel.appendChild(prevControl);
    myCarousel.appendChild(nextControl);
    
    // Clear old content and add my carousel
    carouselContainer.innerHTML = '';
    carouselContainer.appendChild(myCarousel);
}

// Component 7: Alert/Toast Component
// This function shows notification messages that appear and disappear automatically
// I learned how to create different alert types and use setTimeout for auto-hiding
function showAlert(message, type) {
    // Find or create a container for alerts
    var alertContainer = document.getElementById('alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'alert-container';
        document.body.appendChild(alertContainer);
    }
    
    // Create the alert box
    var myAlert = document.createElement('div');
    myAlert.className = 'alert alert-' + type + ' alert-dismissible fade show';
    myAlert.setAttribute('role', 'alert');
    
    // Create the message text
    var alertText = document.createElement('span');
    alertText.textContent = message;
    
    // Create the X close button
    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close';
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    
    // Put the message and close button together
    myAlert.appendChild(alertText);
    myAlert.appendChild(closeButton);
    
    // Add the alert to the container
    alertContainer.appendChild(myAlert);
    
    // Auto-hide the alert after 5 seconds
    setTimeout(function() {
        if (myAlert.parentNode) {
            myAlert.classList.remove('show');
            setTimeout(function() {
                if (myAlert.parentNode) {
                    myAlert.remove();
                }
            }, 150);
        }
    }, 5000);
}
