Contributing
------------

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

**Here is how you can help**

### Table of contents:
- [Introduction](#introduction)
- [Communication channels](#communication-channels)
- [Using the issue tracker](#using-the-issue-tracker)
  - [Issues and labels](#issues-and-labels)
  - [Bug reports](#bug-reports)
  - [Feature Requests](#feature-requests)
  - [Code Examples](#code-examples)
- [Pull Requests](#pull-requests)
  - [Documentation](#documentation)
  - [Submitting Your Pull Request](#submitting-your-pull-request)
- [Translations](#translations)
- [Testing](#testing-guide)

## Introduction
Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue or assessing
patches and features.

### Communication channels

Before you now get lost in the repository, here are a few starting points for you to check out. You might find that others have had similar questions or that your question rather belongs in one place than another.

* Chat (community): https://spectrum.chat/materialize
* Website: https://materialize-angular.workylab.com/

## Using the issue tracker

The [issue tracker](https://github.com/workylab/materialize-angular/issues) is the preferred channel for [bug reports](#bug-reports), [features requests](#feature-requests) and [submitting pull requests](#pull-requests), but please respect the following conditions:

* Please **do not** use the issue tracker for personal support requests. [Stack Overflow `materialize-angular`](https://stackoverflow.com/questions/tagged/materialize-angular) tag is the best place to get help or use our [Spectrum community](https://spectrum.chat/materialize).

* Please **do not** post comments like "+1" or ":thumbsup:". Use [GitHub's "reactions" feature](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments)  instead. We reserve the right to delete comments which violate this rule.  

* Please **do not** open issues without clearly stating the problem and desired result. [See the bug reports section](#bug-reports) for more information on creating effective issues.

* Please **do** [search for duplicate or closed issues](https://github.com/workylab/materialize-angular/issues?utf8=%E2%9C%93&q=is%3Aissue) and make sure to go through our [labels](https://github.com/workylab/materialize-angular/labels), before you open a new issue. Duplicate issues will be closed.

* Please **close your own issue** once it is resolved.

* Every participant is **expected to follow** the project's [Code of Conduct](CODE_OF_CONDUCT.md) so please be courteous and respectful.

### Issues and labels

Our bug tracker utilizes several labels to help organize and identify issues. Here's what they represent and how we use them:

- `bug` - Something isn't working
- `duplicate` - This issue or pull request already exists
- `enhancement` - New feature or request
- `feature` - New feature or request
- `invalid` - This doesn't seem right
- `question` - Further information  is requested
- `wontfix` - This will not be worked on

For a complete look at our labels, see the [project labels page](https://github.com/workylab/materialize-angular/labels).

### Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful! Unclear issues with little explanations will be closed.


#### Guidelines for bug reports:

1. **Use the GitHub issue search** - check if the issue has already been reported.

2. **Check if the issue has been fixed** - try to reproduce it using the latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; create a [reduced test case](https://css-tricks.com/reduced-test-cases/) using [Codepen](http://codepen.io/pen).

A good bug report shouldn't leave others needing to chase you up for more information. Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) and OS experience the problem? Do other browsers show the bug differently? What would you expect to be the outcome? All these details will help people to fix any potential bugs. Just make sure to fill out the issue template.

### Feature Requests

We like feature requests but make sure that it can be seen within the goals of the project and not just something you need individually. Also you should try and give as much examples and details about the new feature as possible. If you are requesting a component from the [Material design guidelines](https://material.io/guidelines/), make sure to include a link to the component.

### Code Examples

- Issues without a [Codepen](#code-examples) (where applicable) will be closed or ignored.
- Use this [Codepen](http://codepen.io/pen) to illustrate your problem.

## Pull requests

Good pull requests - patches, improvements, new features - are a fantastic help. Thanks for taking the time to contribute.

**Please ask first** before working on any significant pull request, otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

### Documentation

When contributing to Materialize's documentation, you should edit the documentation repository in
[materialize-angular-guide](https://github.com/workylab/materialize-angular-guide).
**Do not edit the `gh-pages` branch.** That branch is generated from the documentation source files and is managed separately by the materialize-angular maintainers.

### Submitting Your Pull Request

Adhering to the following process is the best way to get your work included in the project:

1. [Fork](https://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/materialize-angular.git
   # Navigate to the newly cloned directory
   cd materialize-angular
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/workylab/materialize-angular.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks with messages written in english. Please adhere to these [git commit message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) or your code is unlikely be merged into the main project.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description against the `master` branch. Reference any open issue in the description so it is automatically linked. Try and keep your commit history clean and concise. Once you submit your pull request, [CircleCI](https://circleci.com/gh/workylab/materialize-angular) will automatically run your tests and will show a checkmark to show that all the tests have passed. Once this is done, we’ll review your tests and code and make comments if there are issues or things we think could be improved. Then once everything looks good we’ll merge the code in!

## Translations

We're working in the documentation translation. Hopefully we will have soon and we will add the possibility of contribute with more translations :)

### Testing Guide

[CircleCI](https://circleci.com/gh/workylab/materialize-angular)

WIP

## License

**IMPORTANT**: By contributing your code, you agree to allow the project owners to license your work under the terms of the [MIT License](LICENSE).
