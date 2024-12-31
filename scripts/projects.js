// projects.js
function fetchProjects() {
    return fetch("data/projects.json")
      .then(r => r.json())
      .then(data => {
        if (!data.projects) throw new Error("Invalid JSON");
        return data.projects;
      });
  }
  