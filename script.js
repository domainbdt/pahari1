$(document).ready(function() {
    $('#domainForm').on('submit', function(e) {
        e.preventDefault();
        
        var domain = $('#domainName').val().trim();
        if (domain) {
            checkDomainAvailability(domain);
        } else {
            $('#result').html('<div class="alert alert-warning">Please enter a domain name.</div>');
        }
    });
});

function checkDomainAvailability(domain) {
    $('#result').html('<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>');

    $.ajax({
        url: 'https://api.domainsdb.info/v1/domains/search?domain=' + domain,
        method: 'GET',
        success: function(data) {
            if (data.total === 0) {
                $('#result').html('<div class="alert alert-success">The domain is available!</div>');
            } else {
                $('#result').html('<div class="alert alert-danger">The domain is already taken.</div>');
            }
        },
        error: function() {
            $('#result').html('<div class="alert alert-danger">An error occurred while checking the domain.</div>');
        }
    });
}
