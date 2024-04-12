const newFormHandler = async (event) => { // This pull data from the input boxes where the user put their data (for profile). Then you need a place on the server that will accept this data and put it into the database. 

const form = document.getElementById("form");

  form.addEventListener("submit", submitForm);
  
  function submitForm(e) {
      e.preventDefault();
      const name = document.getElementById("name");
      const files = document.getElementById("files");
      const formData = new FormData();
      formData.append("name", name.value);
      for(let i =0; i < files.files.length; i++) {
              formData.append("files", files.files[i]);
      }
      fetch("http://localhost:3002/upload_files", {
          method: 'POST',
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
      })
          .then((res) => console.log(res))
          .catch((err) => ("Error occured", err));
  } 

  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const needed_funding = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/projects`, { // If the user gives you all the data you want then you're going to fetch to some back end profile route that you're going to have to make yourself. It will be a post
      method: 'POST', 
      body: JSON.stringify({ name, needed_funding, description }), // The stringify will be the same, you're just adding your data 
      headers: { // You still need the headers
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) { 
      document.location.replace('/profile'); // And if the response is ok it needs to go somewhere --> projectRoutes.js
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};
// Not using this submit button right now for project
document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler); // Make sure to button your event listener on your form not on the button, if using

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
