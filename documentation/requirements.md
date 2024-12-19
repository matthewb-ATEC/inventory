Requirements Document

# Table of Contents

- [Introduction](#introduction)

- [Project Scope](#project-scope)

- [Functional Requirements](#functional-requirements)

- [Non-Functional Requirements](#non-functional-requirements)

- [Related Documents](#related-documents)

## Introduction

- [Purpose of the document](#purpose-of-the-document)

- [Intended audience](#intended-audience)

- [Project overview](#project-overview)

## Project Scope

- [Objectives](#objectives)

- [Deliverables](#deliverables)

- [Exclusions](#exclusions)

- [Assumptions and dependencies](#assumptions-and-dependencies)

## Functional Requirements

- [Detailed description of the functional requirements](#detailed-description-of-the-functional-requirements)

- [Use cases](#use-cases)

- [User stories](#user-stories)

## Non-Functional Requirements

- [Performance requirements](#performance-requirements)

- [Security requirements](#security-requirements)

- [Usability requirements](#usability-requirements)

- [Compliance requirements](#compliance-requirements)

- [Reliability requirements](#reliability-requirements)

- [Performance efficiency](#performance-efficiency)

- [Maintainability requirements](#maintainability-requirements)

## Related Documents

- [Functional Specification](#functional-specification)

- [Entity Relationship Diagram](#entity-relationship-diagram)

- [Test Plan](#test-plan)

- [Defect Log](#defect-log)

- [User Manual](#user-manual)

- [GANTT Chart](#gantt-chart)

---

# Introduction

## Purpose of the Document

This document defines the essential features of the project with specific measurable goals.

## Intended audience

### Project Managers

- **Purpose:** To understand the scope, objectives, deliverables, and timeline of the project.

- **Use:** To plan, monitor progress, allocate resources, and ensure that the project stays on track.

### Development Team (Developers, Engineers, Designers):

- **Purpose:** To get detailed information on the features, functionalities, and technical requirements of the project.

- **Use:** To guide the development process, ensure that they meet the specified requirements, and implement the necessary functionalities.

### Quality Assurance (QA) Team

- **Purpose:** To understand the expected functionality and performance of the project.

- **Use:** To create test plans, test cases, and to ensure that the product meets the specified requirements and quality standards.

### Business Analysts:

- **Purpose:** To analyze the business needs and ensure that the project aligns with the business objectives.

- **Use:** To ensure that all business requirements are captured and addressed.

### Stakeholders/Clients:

- **Purpose:** To ensure that the project meets their needs and expectations.

- **Use:** To verify that all their requirements are being addressed and to approve the scope and deliverables of the project.

### Operations and Maintenance Teams:

- **Purpose:** To understand the system requirements and functionalities for future maintenance and support.

- **Use:** To prepare for the deployment, support, and maintenance of the system post-implementation.

### Documentation Writers/Technical Writers:

- **Purpose:** To create user manuals, help guides, and other documentation.

- **Use:** To understand the functionalities and features that need to be documented for end-users.

## Project overview

### Project Name

Inventory App

### Purpose

The purpose of the Inventory App is to provide a single location for tracking, monitoring, and updating material inventory in the Innovation Center warehouse.

---

## Project Scope

The project involves developing a web application with a robust backend to manage inventory, material information, shipments, and requests.

### Objectives

#### Inventory

View the stock of materials in the warehouse. Search and filter by overall, project specific, and unassigned stock or by vendors. Provide a detailed material view with information on crate locations, project distribution, recents shipments, and images. Allow redistribution of materials to projects in the detailed material view.

#### Shipments

Increase and decrease material stock as crates arrive and depart from the warehouse. Provide a list of all previous shipments. Search and filter by direction, origin, destination, project, or vendor.

#### Crates

List each crate and its status of either received, stored, or shipped along with its location and contents. Search and filter by status, condition, and location.

#### Requests

Provide an interface to select materials and quantities required at a specific job site from the available inventory.

#### Projects

Add and remove projects ad new jobs are started and completed. Update existing materials to unassigned when their associated project is removed.

### Deliverables

#### Front-End Application

An interactive web application for viewing and managing inventory.

#### Back-End System

A database and server-side application to handle material catalog, inventory stock, shipments, crates, and locations.

#### User Documentation

A comprehensive user manual to guide users in utilizing the full functionality of the system.

#### Test Plan and Defect Log

Detailed test cases and defect tracking to ensure quality and reliability.

### Exclusions

#### Mobile Application Development

This project will focus solely on developing a web application. Mobile applications are not included in the current scope.

#### User Authentication

Tracking activity based on user profiles not included in the current scope.

#### Procore Integration

Integration with Procore to retrieve an up to date projects list, create productivities and deliveries, or any other functionality relating to Procore is not included in the current scope.

#### Offline Functionality

The application requires a stable internet connection for communication with the server and data synchronization. Offline capabilities are not part of the project scope.

#### Comprehensive Training Programs

The project will include a user manual and basic user training documentation, but comprehensive training programs or workshops for users are not included.

#### Hardware Provisioning or Support

Providing or supporting hardware required for using the application (e.g., computers) is outside the project’s scope.

#### Extended Maintenance and Support:

While initial support will be provided post-launch, ongoing long-term maintenance and support services are not included and would need to be covered under a separate agreement.

#### Exclusive Access

The web application is publically accessible on the internet and not protected by user authorization, so the data can be altered by anyone.

#### QR and Barcode Scanning

The application will not support QR code or Barcodes to identify any data.

#### Return Shipments

The application will not support shipments back to the original sender.

#### Shipments to Subcontractors

The application will not support shipments to intermediary subcontractors.

#### Comments

The application will not support posting and tracking comments associated with shipments or other actions.

### Assumptions and dependencies

#### User Hardware

Assumes users have the necessary hardware to interact with the internet through a web browser.

#### Internet Connectivity

Assumes stable internet connectivity for communication with the server and data synchronization.

#### Consistent Documents

Assumes standard document formats for all .csv file uploads.

#### Consistent Material Identifiers

Assumes standard material identification values to distinguish between identical and unique material types.

---

## Functional Requirements

### Detailed description of the functional requirements

### Inventory

- **Stock**: Users must be able to view the quantity of each material stored in the warehouse.

- **Filtering**: Stock must be filterable into overall quantities and project specific materials.

- **Catalog**: Users must be able to view, add, and remove unique material types stored in inventory.

### Shipments

- **Incoming Shipments**: Users must be able to process incoming shipments specifying the vendor, project, contents, crate information including crate number, damages, and storage location, and images.

- **Outgoing Shipments**: Users must be able to log outgoing shipments including the destination and contents including crate numbers, crate contents, and images.

- **History**: Previous shipments must be accessible for review to confirm the status and location of materials.

### Requests

- **Material Requests**: Users on site must be able to select materials from the available inventory to be shipped to a project site.

### Prefabrication

-- **Before Prefabrication**: Users must be able to select materials from the available inventory to prefabricate.

-- **After Prefabrication**: Users must be able to group prefabricated materials into a crate and specify the crate number, project, contents, and storage location.

#### Material Details

- **Display Material Information**: Display the name, size, color, vendor, and other unique characteristics of the material.

- **List Locations**: Display all crate locations containing this material.

- **Stock**: Display the quantity assigned to projects, unassigned to projects, and the total stored in the warehouse.

#### Metadata

- **Timestamps**: Log the time data was created and last updated.

#### Backend Integration

- **Data Storage**: Store all materials, stock, crates, locations, shipments, and requests.

### Use Cases

#### View Overall Inventory

- **Description**: A user views the overall inventory of materials stored in the warehouse to check quantities and locations.

- **Actors**: User

- **Preconditions**: The application is running and the user has navigated to the inventory page.
- **Main Flow**: User selects the "Overall Inventory" view → System fetches data for all materials in the warehouse → System displays a list of materials with quantities, locations, and other relevant details.

#### Pulling Material for Prefabrication

- **Description**: A user selects materials from the inventory to begin the prefabrication process.

- **Actors**: User

- **Preconditions**: The application is running and the materials needed for prefabrication are in the inventory.

- **Main Flow**: User navigates to the prefabrication page → User selects the materials required for prefabrication → User specifies the quantities to pull for prefabrication → System validates the quantities against the available inventory → System deducts the specified quantities from the inventory and updates the prefabrication list.

#### Storing Prefabricated Materials

- **Description**: A user stores prefabricated materials in a designated crate and updates the inventory.

- **Actors**: User

- **Preconditions**: The prefabrication process is complete and crates are available for storage.

- **Main Flow**: User navigates to the storage page for prefabricated materials → User selects or creates a crate → User assigns prefabricated materials to the selected crate → System validates the storage location and updates the crate information in the database → System displays a confirmation message with updated inventory and crate details.

#### Relocate a Crate

- **Description**: A user moves a crate from one location to another within the warehouse.

- **Actors**: User

- **Preconditions**: The application is running and the crate exists in the system.

- **Main Flow**: User navigates to the crate management page → User selects a crate to relocate → User specifies the new storage location → System validates the new location → System updates the crate's location in the database → System displays a confirmation message with updated location details.

#### Change Material Project Assignment

- **Description**: A user reassigns materials from one project to another.

- **Actors**: User

- **Preconditions**: The material exists in the inventory and projects are defined in the system.

- **Main Flow**: User navigates to the material details page → User selects the option to change project assignment → User specifies the new project for the material → System validates the new project assignment → System updates the material's project assignment in the database → System displays a confirmation message with updated project details.

#### Incoming Shipment

- **Description**: A user logs an incoming shipment to update inventory with new materials.

- **Actors**: User

- **Preconditions**: The application is running and the user is on the shipments page.

- **Main Flow**: User enters shipment details and uploads a .csv file with shipment information → System validates and parses the → sv file → System displays the parsed crate and material contents for review → User confirms the shipment contents → System updates inventory with new materials and quantities → System logs the shipment in the shipment history → System displays a confirmation message with updated inventory details.

#### Outbound Shipments

- **Description**: A user logs an outgoing shipment to update inventory and record shipment details.

- **Actors**: User

- **Preconditions**: The application is running and the materials for shipment are available in the inventory.

- **Main Flow**: User navigates to the shipment page → User selects the option to create an outgoing shipment → User specifies shipment details, including destination, materials, and quantities → System validates the shipment details against the available inventory → System deducts the materials from the inventory → System logs the shipment in the shipment history → System displays a confirmation message with shipment details.

### User Stories

#### Inventory

- As a user, I want to view the overall inventory, so that I know how much material we have and where its located in the warehouse.

- As a user, I want to view the project specific inventory, so that I know how much material is assigned to that project and where its located in the warehouse.

- As a user, I want to view the unassigned inventory, so that I can repurpose extra material in our possession.

- As a user, I want to reassign material from one project to another, so that I can meet the immediate demands of unexpected emergencies.

#### Projects

- As a user, I want to remove a project, so that I can free up remaining materials.

- As a user, I want to create a project, so that I can assign materials to a new project.

#### Shipments

- As a user, I want to log incoming shipments to the warehouse, so that our stock updates to include the new materials.

- As a user, I want to log incoming shipments to a project site, so there is a record of receiving the materials.

- As a user, I want to log outgoing shipments, so that our stock updates to remove the shipped materials.

- As a user, I want to view the shipment history, so that can confirm a shipment has been received or sent.

#### Prefabrication

- As a user, I want to pull materials from storage, so that I can prefabricate panels.

- As a user, I want to crate prefabricated panels, so that they are ready for outbound shipments.

#### Crates

- As a user, I want to see a list of crates, so that I can view their contents, status, and location.

- As a user, I want to see a list of damaged crates, so that I can return the crate and order new materials.

#### Requests

- As a user, I want to request materials, so the warehouse knows what materials our site needs.

- As a user, I want to view outstanding requests, so the requested materials can be crated and shipped.

---

## Non-Functional Requirements

#### Performance Requirements

- **Response Time**: The application should respond to user interactions (e.g., proccessing shipments, filtering inventory) within 2 seconds under normal operating conditions.

- **Concurrency**: Support at least 100 concurrent users accessing and interacting with inventory data simultaneously without performance degradation.

#### Security Requirements

- **None**: There are currently no security requirements

#### Usability Requirements

- **Intuitive Interface**: The user interface should be intuitive and user-friendly, with clear navigation and minimal learning curve for new users.

- **Accessibility**: Ensure the application is accessible to users with disabilities, following WCAG 2.1 guidelines for web accessibility.

- **Device Compatibility**: Support for various web devices (e.g., mobile browsers, desktop PCs) and screen sizes without compromising usability.

#### Compliance Requirements

- **Data Privacy**: Comply with GDPR regulations regarding data privacy and protection, especially concerning user data storage and processing.

- **Legal Compliance**: Ensure the application complies with relevant legal requirements and regulations in the jurisdictions where it operates.

#### Reliability Requirements

- **Availability**: Aim for at least 99% uptime, allowing for maintenance and updates during off-peak hours.

- **Fault Tolerance**: Implement mechanisms (e.g., redundant servers, automated failover) to ensure minimal disruption in case of server failures or network issues.

- **Backup and Recovery**: Regularly backup application data and implement a recovery plan to restore data in case of data loss or corruption.

#### Performance Efficiency

- **Resource Usage**: Optimize resource usage (CPU, memory) to ensure efficient performance and scalability, particularly during peak usage times.

#### Maintainability Requirements

- **Code Quality**: Maintain high code quality standards with clear documentation and adherence to coding best practices.

- **Modularity**: Design the application with a modular architecture to facilitate easy maintenance, updates, and future enhancements.

- **Version Control**: Use version control systems (e.g., Git) to track changes and manage codebase collaboration effectively.

---

## Related Documents

A list of documents that provide additional details and specifications about the project.

### Functional Specification

Defines the classes, properties, and interfaces, and their expected functionality. It also includes the definition of database tables, attributes, data types, and relationships.

### Entity Relationship Diagram

Outlines the relationships within the database.

### Test Plan

Defines the test cases and expected outputs for unit, module, and integration tests.

### Defect Log

Lists all defects including details of the issue, identification date, identifier, assumed solution, actual solution, resolution date, and resolution author.

### User Manual

Guides the user in exercising the full functionality of the product.

### GANTT Chart

Predicts the development timeline with detailed milestones.
