### Skills

---

- Everything syntax `highlighted` in my work experience, is broadly what technologies/frameworks/patterns I have worked with. I have of course played around with other stuff to, and will gladly explain & talk about them, if you want :sunglasses: _(I have though written some of them in the bottom, if you just want a quick look)_

### Work experince

---

- **ONE.COM: Let's give React a try**

  Quality, monitoring and team focus. Key parts of what my colleague (and boss) think we should work on. So got handed a project, to create/update an infoscreen, to be more visible. Because the company have worked with `React` & `Redux`, my team took the decision to use that for this project also - and comming from the `Angular` world, I can say that there are differences :grimacing:.

  But for me as an eye opener was that ONE.COM is a place for no Microsoft, no Windows, no ui applications, only Linux, `Bash`, `SSH`. Argh, its not that bad, but I can't definitly say that a terminal is a must when I develop now. Have started to see the cool and deeper features of `GIT`, and `Docker` has been a complete eye opener [(did this small project as an example on how to work with node & express inside a docker container)](https://github.com/mikkeldamm/docker-node-express-nodemon).

- **DFDS: Booking platform had to much maintaince and risk, so let's start fresh**

  Info comming .. key parts (`Angular2`, `MSSQL`, `Redis`, `ASP.NET MVC`, `REST`, `SASS`, `VSTS`, `Powershell`)

  [Reference](https://ferry.dfdsseaways.co.uk/?salesowner=14&locale=en)

  [Reference - new platform](https://ferry.dfdsseaways.co.uk/agent?salesowner=14&locale=en)

- **DFDS: Responsive DFDS.com became a design package architecture**

  DFDS.com should enter the digital age, and become responsive with a more flat look and feel & rich on UX. It was quite of a challenge because the site was built on SharePoint, and therefor the whole editor part almost broke when you append responsive styles. So my manager and I decided to create a uniform DFDS style/design package that could serve different component and base styles with custom integration in each project. The package started with just being CSS styles (built in `SASS`), and exposed as a nuget package. This solution worked for compiled style, but not for open components that could be inheritet. Therefor we shifted to have a private `bower package` (we should maybe have gone with npm package instead). The responsive style was built on top of the `Zurb Foundation` grid, and every size was tried to be kept in `em` [(private example)](http://codepen.io/mikkeldamm/pen/xOZvab) to allow parent scaling and easier customization.

  After the first release - somewhere in november 2015 - I was moved to the another team to help on that application, and both the website and the style package/guide was handed over to the SharePoint team (don't know the status of it today sadly)

  [Reference](http://www.dfds.com/)

  [Style guide](https://dfdsstyleguide.azurewebsites.net/)

- **DanaWeb: Scrum, Testing, Security & Frontend decoupling**

  On2day should become this big site, where you could create a webshop in 3 simple steps. We decided to go the full scrum way, but in the end formed it, to fits us. I'm a strong fighter for quality, so we implemeted 3 layers of test (`unit`, `integration` & `UI`) and with a `TDD` approach. We decoupled the frontend from the backend, via an `API` layer with some of the calls hooked up to `SignalR` (socket). The frontend was built in `Angular 1` and `LESS`, where tasks - like bundling, minification etc. - was done by `gulp`.

  `CQRS` [(private example)](https://github.com/mikkeldamm/cqrs-es-ddd) became our approach for handling business logic actions to the inside world. So we would have the site, a query db and a command queue db (`redis`) in the external zone. Then a C# library would execute commands from the command queue and notify the site via `REST`. In this way we ensured that internal system wasn't accessible from outside.

  The project sadly wasn't realeased because one of the partners shut it down. Some of the people I worked with was [@irq](https://github.com/irq), [@sorenhansendk](https://github.com/sorenhansendk), @ryanjensen

- **DanaWeb: Collaboration between Ukrainian colleagues**

  Went to Ukraine with to colleagues, to kickstart a project where we could distribute, and update our customers websites continuously. Met skillfulled persons, with qualities I learned a lot from, but mostly got experience in how different cultures affect they way we work. And definetly got my `english talking skills` improved.

  [Reference](https://www.linkedin.com/in/mikkeldamm#project-57)

- **DanaWeb: Custom built .NET CMS with a responsive website builder**

  My ex colleague [(@sorenhansendk)](https://github.com/sorenhansendk) and I started writing a CMS in .NET in private for fun. After 2-3 months we showed it to one of the partners in DanaWeb (where we worked), and he was so excited about it, that we got 3 months to finish it - in exchange for very little cash, but a lot of fun :) . The basics of the CMS was built in .NET WebForms 4 (C#) with `html`, `css`, `js` & `jQuery` on top - lots of special modules. In the period of the 3 months we got the idea to built a complete website designer/builder as a part of the CMS. It was built with a module mindset, so every javascript was built as classes `prototype` and `jQuery` was used to handle and control the DOM. Almost every website built in DanaWeb is built in this CMS.

  _Side note:_ because of the modularity, we actually accomplised to extend the builder & cms to understand, and control
  responsive layouts in around 2-3 weeks without any big issues. The css was built upon the `Zurb Foundation framework`.

  [Reference - Websites built in the CMS](http://danaresponsive.blogspot.dk/)

### Private experience

---

- **Hoestt: iPhone app built in Angular 2**

  Who doesn't want newly dug up potatoes, good organic peas or fresh strawberries. I want, but I don't know where the stalls are. So decided to create an iPhone app that shows stalls on a map, with its different contents.

  I'm quite familiar in `Angular2` and have worked with `Firebase`, so why not give `NativeScript` a try for this :eyeglasses: and the app design (logo and all) is something that i'm really proud of - actually clapped my hands for days after I did it.

  Sadly I wasn't able to finish the app before summer, so it must wait till next year - but aside from that, I think its really cool that I was able to create a "simple" but still very responsive app for iOS in just `JavaScript` with `Angular2`.

  [Source](https://github.com/mikkeldamm/hoestt)

- **Luftr: Lets try Angular 2 and Firebase**

  I just want a dedicated service to find people who wants to walk dogs (specially mine). Simple, clean, customer rated. Nothing else, nothing big. But sadly, in my opinion, that is really hard to find :disappointed:

  So I will goddamn do it my self. I don't want any backend and maintaince of servers. I just want a static site that works as an Application where people can find people to walk there dogs.

  :star2:`Angular2` and `Firebase`:star2: for the rescue. Started when Angular2 still was in alpha, and continuously followed until the latest RC. For auth i rely on `Auth0` that is connected to my `Firebase` which the app is also. Its built after a component structure/architecture with best practices from the `Angular2` doc.

  [Reference](https://luftr.dk)

  [Source](https://github.com/mikkeldamm/luftr)

- **BoligF: The never ending project that have tought me almost anything**

  BoligF has been a long going project I started in 2011. The first draft was a website in `ASP.NET MVC` with repositories on top of `entityframework`. I then got in love with CQRS and tried to implement that on top of entityframework. After some `meetups` I got the hang of `CQRS` and saw how well it worked with `DDD` and `Event Sourcing`, so rebuilt the entire site up from ground again, now with CQRS & Event sourcing. Then I fell in love with `Angular` and wanted to make the separation of frontend from backend, so created a `REST api` with the underlaying architecture from above, and after some battles with entityframework, then I shifted to `MongoDB` for storing events as `json`.

  BoligF have never been set as done or released. I was overtaken by another site having same concept. But I have learned a lot from the project and have used it to try new technologies, frameworks, patterns etc.

  [Reference](http://boligf.dk/)

  [Source](https://github.com/mikkeldamm/boligf) (have more source on VSTS)

### Certificates

---

- Coregile Mob Programming Certificate
- [Certified Agile Tester (CAT)](http://www.agile-tester.org/alumni-cat/articles/denmark.html)
- ISTQB Software Tester Foundation Certificate

---

`HTML5`, `CSS3`, `Javascript`, `jQuery`, `Angular1 & 2`, `TypeScript`, `RxJS`, `SASS`, `LESS`, `Bootstrap`, `Zurb Foundation`, `NodeJs`, `NPM`, `Bower`, `ASP.NET & MVC`, `C#`, `REST`, `CQRS`, `DDD`, `TDD`, `Karma`, `Mocha`, `Jasmine`, `UnexpectedJs`, `GIT`, `VSTS`, `Docker`, `Gulp`, `React`, `Redux`, `KnockoutJS`, `Firebase`

        <div className="pt-24 md:pt-36">
          <h2 className="text-5xl font-bold tracking-tighter text-primary">Coding Moon</h2>
          <p className="mt-6 text-xl tracking-tight text-secondary lg:w-2/3">
            I&apos;m passionate about designing and developing solutions that engage users and
            involve them into the platform. It can be a digital products from scratch or upgrading
            existing ones.
          </p>
          <div className="grid gap-10 mt-14 sm:grid-cols-2 md:grid-cols-3">
            <div className="">
              <h3 className="mb-6 text-3xl font-bold tracking-tight text-primary">
                01. Development
              </h3>
              <p className="text-xl tracking-tight md:pb-5 post text-secondary">
                I always make sure the projects is developed with the technologies most fit for the
                context and that it is easy to maintain.
              </p>
            </div>
            <div className="">
              <h3 className="mb-6 text-3xl font-bold tracking-tight text-primary">
                02. Web / App Design
              </h3>
              <p className="text-xl tracking-tight md:pb-5 post text-secondary">
                I love prototyping design solutions for better user experience. Useally I do it in
                the process while developing the product, but always start on a blank piece of
                paper.
              </p>
            </div>
            <div className="">
              <h3 className="mb-6 text-3xl font-bold tracking-tight text-primary">
                03. Logo design
              </h3>
              <p className="text-xl tracking-tight md:pb-5 post text-secondary">
                Logo designing is a hobby of mine, where I can exlore the creativity of expressing a
                name or brand without the technically side affecting it.
              </p>
            </div>
          </div>
        </div>
