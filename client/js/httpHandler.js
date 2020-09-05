(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //

  const swimCommandFetcher = (callback = ()=>{}) => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      data: 'Data to be here',
      success: (data) => {
        console.log('Data:', data);
        callback(data);
      }
      // response: res.test
    });
  };
  // let {req, res} = swimCommandFetcher();
  // console.log(res);
  const handleData = (data) => {console.log('Data coming through: ', data)};
  setInterval(swimCommandFetcher, 4000);
  // we are receiving data per the comment above and pinging the server

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: 'FILL_ME_IN',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
