document.addEventListener("DOMContentLoaded", () => {
  const terminalScreen = document.getElementById("terminal-screen");
  const customInput = document.getElementById("custom-input");

  // store the "typed" text in a variable
  let currentInput = "";

  // commands
  const commands = {
    help: {
      action: () => {
        printLine("about : about me\nprojects: list my projects\ncontact : how to reach me\nclear : clear the terminal\nhelp : this help");
      }
    },
    about: {
      action: () => {
        printLine("Hello, I'm River Dowdy. I am a freshman at Stanford who wants to change the very paradigm of how we think about the world. I want to design and create things that have never been seen before or thought of. \n I am passionate about pretty much anything engineering, from processor design to devices that harvest stem cells. \n You will often find me working on my sadly still-not-finished Redstone computer, climbing, 3d modeling, playing racing games, and playing my mini didgeridoo.");
      }
    },
    contact: {
      action: () => {
        printLine("Email: rivdowdy@stanford.edu\nGitHub: https://github.com/Rivercraft911 \nLinkedin: linkedin.com/in/river-dowdy-5b597124a ");
      }
    },
    projects: {
      action: () => {
        fetchProjects().then(list => {
          if (!list.length) {
            printLine("No projects found in data/projects.json");
            return;
          }
          let str = "Projects:\n";
          list.forEach((p, i) => {
            str += `${i+1}) ${p.title}\n   ${p.description}\n`;
            if (p.github) str += `   GitHub: ${p.github}\n`;
            if (p.demo) str += `   Live Demo: ${p.demo}\n`;
            if (p.link) str += `   More Info: ${p.link}\n`;
            str += "\n";
          });
          printLine(str);
        }).catch(e => printLine("Error: " + e.message));
      }
    },
    clear: {
      action: () => {
        terminalScreen.innerHTML = "";
      }
    }
  };

  // Capture keystrokes in customInput
  customInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent a newline
      // process command
      const inputVal = currentInput.trim();
      if (inputVal) {
        printLine(`visitor@rivercraftterminal.dev:~$ ${inputVal}`, "cmd");
        runCommand(inputVal);
      }
      // reset
      currentInput = "";
      customInput.setAttribute("data-content", "");
    }
    else if (e.key === "Backspace") {
      e.preventDefault();
      currentInput = currentInput.slice(0, -1);
      customInput.setAttribute("data-content", currentInput);
    }
    else if (e.key.length === 1) {
      // typed a normal char
      e.preventDefault();
      currentInput += e.key;
      customInput.setAttribute("data-content", currentInput);
    }
  });

  // runs the command
  function runCommand(cmd) {
    if (commands[cmd]) {
      commands[cmd].action();
    } else {
      printLine(`command not found: ${cmd}\ntry 'help'`);
    }
  }

  // prints output line by line
  function printLine(text, type = "output") {
    const line = document.createElement("div");
    line.classList.add("terminal-line");
    
    const span = document.createElement("span");
    span.style.whiteSpace = "pre-wrap";
    
    if (type === "cmd") {
      // typed command => show instantly in green
      span.style.color = "var(--cmd-color)";
      span.textContent = text;
    } else {
      // use typewriter for output
      typewriter(text, span, 15);
    }
    
    line.appendChild(span);
    terminalScreen.appendChild(line);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  // Automatically focus the input field
  customInput.focus();
});
