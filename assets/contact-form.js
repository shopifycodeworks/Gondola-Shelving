$(document).ready(function() {
      $('#ContactForm-name, #RegisterForm-FirstName, #RegisterForm-LastName, #AddressFirstNameNew, #AddressLastNameNew').on('input', function() {
        var inputValue = $(this).val();
        var sanitizedValue = inputValue.replace(/[^a-zA-Z\s]/g, ''); // Keep only letters
        $(this).val(sanitizedValue);
      });

      $('#ContactForm-email').on('input', function() {
      var inputValue = $(this).val();
      // var sanitizedValue = inputValue.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, ''); 
      var sanitizedValue = inputValue.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');      
    });

      $(document).on("paste drop", "#ContactForm-name", function (e) {
        e.preventDefault();
        return false;
    });

      $('.contactPhone').on('input', function() {
       var inputValue = $(this).val();
       var sanitizedValue = inputValue.replace(/[^0-9]/g, ''); // Keep only numeric digits
       sanitizedValue = sanitizedValue.slice(0, 16); // Limit to a maximum of 15 digits
       $(this).val(sanitizedValue);
      });

      $('#AddressZipNew').on('input', function() {
       var inputValue = $(this).val();
       var sanitizedValue = inputValue.replace(/[^0-9]/g, ''); // Keep only numeric digits
       sanitizedValue = sanitizedValue.slice(0, 10); // Limit to a maximum of 10 digits
       $(this).val(sanitizedValue);
      });

  
  });

