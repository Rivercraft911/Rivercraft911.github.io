document.addEventListener("DOMContentLoaded", () => {
  const terminalScreen = document.getElementById("terminal-screen");
  const customInput = document.getElementById("custom-input");
  // store the "typed" text in a variable
  let currentInput = "";

  // Function to ensure scrolling to bottom
  function scrollToBottom() {
    setTimeout(() => {
      terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }, 0);
  }

  // commands
  const commands = {
    help: {
      action: () => {
        printLine("about     : about me\nprojects  : list my projects\ncontact   : how to reach me\nskills    : list my technical skills\neducation : view my education details\nthemes    : view available themes\nclear     : clear the terminal\nhelp      : this help");
      }
    },
    about: {
      action: () => {
        printLine("Hello, I'm River Dowdy. I am a freshman at Stanford who wants to change the very paradigm of how we think about the world. I want to design and create things that have never been seen before or thought of. \n\nI am passionate about pretty much anything engineering, from IC design to biocomputing!! \n\nYou will often find me working on my sadly still-not-finished Redstone computer, climbing, 3working on silly projects, playing racing games, and playing my mini didgeridoo.");
      }
    },
    contact: {
      action: () => {
        printLine("Email: rivdowdy@stanford.edu\nGitHub: https://github.com/Rivercraft911 \nLinkedin: linkedin.com/in/river-dowdy-5b597124a ");
      }
    },
    skills: {
      action: () => {
        printLine("Technical Skills:\n\nProgramming Languages:\n- C++, C, Python\n\nDesign Tools:\n- Fusion 360, SolidWorks, CAD, KiCad\n- Laser Cutting, Water-Jetting, CNC, 3D-Printing\n\nElectronics & Robotics:\n- Microcontrollers (ESP32, Pi Pico, Feather)\n- Sensor Integration\n- Raspberry Pi, Jetson Nano");
      }
    },
    education: {
      action: () => {
        printLine("Stanford University\nMajor: Maybe Electrical Engineering (Not sure yet)\nMinor: Considering Computer Science, Mathematics, or Aerospace Engineering\n\nRelevant Coursework:\n- Linear Algebra and Multivariable Calculus\n- Programming Abstractions\n- An Intro to Making & EE\n- Structured Liberal Education\n- Mechanics and Thermodynamics (Calc Based)");
      }
    },
    themes: {
      action: () => {
        printLine("Available Themes:\n\nmatrix    : Classic green-on-black terminal\ncyber     : Neon blue and pink futuristic theme\nretro     : Vintage computer terminal orange glow\nsynthwave : Purple and pink vaporwave aesthetic\nhacker    : Classic hacker terminal green\nocean     : Calm blue tones inspired by the deep sea\nsunset    : Warm sunset colors with dark background\n\nTo apply a theme, type: theme <name>\nExample: theme matrix");
      }
    },
    theme: {
      action: (args) => {
        const themeName = args.trim();
        if (!themeName) {
          printLine("Usage: theme <name>\nType 'themes' to see available themes");
          return;
        }
        if (window.applyTheme) {
          window.applyTheme(themeName);
          printLine(`Theme changed to ${themeName}`);
        } else {
          printLine("Theme system not initialized");
        }
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
            str += `${i+1}) ${p.title}\n ${p.description}\n`;
            if (p.github) str += ` GitHub: ${p.github}\n`;
            if (p.demo) str += ` Live Demo: ${p.demo}\n`;
            if (p.link) str += ` More Info: ${p.link}\n`;
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
        const [cmd, ...args] = inputVal.split(' ');
        if (commands[cmd]) {
          commands[cmd].action(args.join(' '));
        } else {
          printLine(`command not found: ${cmd}\ntry 'help'`);
        }
      }
      // reset
      currentInput = "";
      customInput.setAttribute("data-content", "");
      scrollToBottom();
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
      line.appendChild(span);
      terminalScreen.appendChild(line);
      scrollToBottom();
    } else {
      // use typewriter for output
      typewriter(text, span, 8, () => {
        scrollToBottom();
      });
      line.appendChild(span);
      terminalScreen.appendChild(line);
    }
  }

  // Ensure scrolling after typewriter effect
  function typewriter(text, element, speed, callback) {
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        scrollToBottom();
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  // Automatically focus the input field
  customInput.focus();
  
  // Handle window resize to ensure proper scrolling
  window.addEventListener('resize', scrollToBottom);
});