# USERS Object Structure Documentation

The following documentation provides a complete description of all fields and nested objects within the `USERS` constant.

---

## Top-Level Fields

- **id** (`string`)  
  Unique identifier for the user in UUID format.

- **phone** (`string`)  
  The user's phone number.

- **email** (`string`)  
  The user's email address.

- **password** (`string`)  
  The user's password.  
  *Note: In a production environment, passwords should be stored securely (e.g., hashed).*

- **verificationEmail** (`boolean`)  
  Indicates whether the user's email has been verified.

- **verificationPhone** (`boolean`)  
  Indicates whether the user's phone number has been verified.

- **telegramId** (`string`)  
  The user's Telegram identifier for communication purposes.

- **role** (`Array<string>`)  
  The roles assigned to the user. For example: `['USER', 'CLINIC']`.

- **organization** (`boolean`)  
  Flag indicating if the user is associated with an organization or represents one.

- **organizations** (`Array<object>`)  
  A list of organization objects associated with the user.

- **patientMedicalRecord** (`object`)  
  A separate, top-level patient medical record for the user (if the user is also a patient).

---

## Organization Object

Each organization within the `organizations` array has the following structure:

- **id** (`string`)  
  Unique identifier for the organization.

- **name** (`string`)  
  The name of the organization (e.g., "Doctor Lab").

- **type** (`string`)  
  The type of organization. In this case, it is a clinic (`"CLINIC"`).

- **userId** (`string`)  
  The ID of the user who owns or is associated with this organization.

- **services** (`Array<object>`)  
  A list of services offered by the organization.

- **patients** (`Array<object>`)  
  A list of patients associated with the organization.

---

### Service Object

Each service object in the `services` array includes:

- **clinicId** (`string`)  
  Identifier of the clinic offering the service.

- **id** (`string`)  
  Unique identifier for the service.

- **name** (`string`)  
  The name of the service (e.g., "General Consultation").

- **description** (`string`)  
  A brief description of the service.

- **price** (`number`)  
  The cost of the service.

- **duration** (`string`)  
  The duration of the service (e.g., "30 minutes").

---

### Patient Object (within an Organization)

Each patient object in the `patients` array includes:

- **id** (`string`)  
  Unique identifier for the patient record within the organization.

- **patientMedicalRecordId** (`object`)  
  An object representing the patient's detailed medical record. This object contains all the clinical data related to the patient.

- **patientId** (`string`)  
  An additional identifier for the patient.

---

#### Patient Medical Record Object (within Organization)

This object includes comprehensive details about the patient:

- **id** (`string`)  
  Unique identifier for the patient's medical record.

- **patientId** (`string`)  
  Identifier linking this record to the patient.

- **firstName** (`string`)  
  The patient's first name.

- **lastName** (`string`)  
  The patient's last name.

- **middleName** (`string`)  
  The patient's middle name.

- **fullName** (`string`)  
  The full name of the patient.

- **dob** (`string`)  
  The date of birth in `YYYY-MM-DD` format.

- **gender** (`string`)  
  The patient's gender (e.g., "male", "female").

- **phone** (`string`)  
  The patient's phone number.

- **email** (`string`)  
  The patient's email address.

- **address** (`string`)  
  The patient's physical address.

##### Additional Details in the Patient Medical Record

- **medicalHistory** (`Array<object>`)  
  A list of past or ongoing medical conditions.  
  Each entry includes:
  - **condition** (`string`): Name of the condition (e.g., "Hypertension").
  - **diagnosisDate** (`string`): Date of diagnosis.
  - **notes** (`string`): Additional details or observations.

- **allergies** (`Array<string>`)  
  A list of known allergies (e.g., `["Penicillin"]`).

- **medications** (`Array<object>`)  
  A list of medications the patient is currently taking or has been prescribed.  
  Each entry includes:
  - **medicationId** (`string`): Unique identifier for the medication.
  - **name** (`string`): Medication name.
  - **dosage** (`string`): Dosage information.
  - **frequency** (`string`): How often the medication is taken.
  - **duration** (`string`): Duration for which the medication is prescribed.

- **appointments** (`Array<object>`)  
  A record of all appointments associated with the patient.  
  Each appointment includes:
  - **id** (`string`): Unique appointment identifier.
  - **date** (`string`): Date of the appointment.
  - **from** (`string`): Start time.
  - **to** (`string`): End time.
  - **doctors** (`Array<object>`): List of doctors involved. Each doctor object includes:
    - **id** (`string`): Doctor's unique identifier.
    - **appointmentId** (`string`): Identifier linking to the appointment.
    - **name** (`string`): Doctor's name.
  - **service** (`object`): Details of the service provided during the appointment. It includes:
    - **clinicId** (`string`)
    - **serviceId** (`string`)
    - **name** (`string`)
    - **description** (`string`)
    - **price** (`number`)
    - **duration** (`string`)
  - **status** (`object`): The current status of the appointment. It includes:
    - **id** (`string`): Unique identifier for the status.
    - **key** (`string`): A key such as `"SCHEDULED"`.
    - **name** (`string`): Human-readable status (e.g., "Scheduled").
    - **description** (`string`): Detailed status description.
  - **notes** (`string`): Additional notes regarding the appointment.

- **prescriptions** (`Array<object>`)  
  A list of prescription records.  
  Each prescription includes:
  - **prescriptionId** (`string`): Unique prescription identifier.
  - **date** (`string`): Date when the prescription was issued.
  - **doctor** (`object`): Information about the prescribing doctor, including:
    - **id** (`string`)
    - **name** (`string`)
  - **medications** (`Array<object>`): List of medications prescribed. Each medication includes:
    - **medicationId** (`string`)
    - **name** (`string`)
    - **dosage** (`string`)
    - **frequency** (`string`)
    - **duration** (`string`)
  - **notes** (`string`): Additional instructions or comments.

- **payments** (`Array<object>`)  
  A list of payment transactions related to the patient's appointments.  
  Each payment includes:
  - **paymentId** (`string`): Unique payment identifier.
  - **appointmentId** (`string`): Associated appointment identifier.
  - **amount** (`number`): Payment amount.
  - **date** (`string`): Date of the payment.
  - **method** (`string`): Payment method (e.g., "Credit Card").
  - **status** (`string`): Payment status (e.g., "Paid").

- **labResults** (`Array<object>`)  
  A list of laboratory test results.  
  Each result includes:
  - **resultId** (`string`): Unique identifier for the lab result.
  - **testName** (`string`): Name of the test (e.g., "Blood Test").
  - **date** (`string`): Date the test was conducted.
  - **results** (`object`): Key-value pairs detailing test outcomes (e.g., cholesterol, glucose).
  - **notes** (`string`): Additional notes on the lab findings.

- **imaging** (`Array<object>`)  
  A list of imaging studies (e.g., X-rays, MRI).  
  Each imaging record includes:
  - **imagingId** (`string`): Unique identifier for the imaging record.
  - **type** (`string`): Type of imaging (e.g., "X-ray").
  - **date** (`string`): Date the imaging was performed.
  - **findings** (`string`): Observations or conclusions from the imaging.

- **notes** (`string`)  
  General notes regarding the patient's health or additional remarks.

---

## Top-Level Patient Medical Record

The `patientMedicalRecord` object outside the organizations represents the medical record of the user as a patient. Its structure is similar to the nested patient record, providing a comprehensive view of the patient's health data.

- **id** (`string`)  
  Unique identifier for the patient's medical record.

- **patientId** (`string`)  
  Identifier linking the medical record to the user.

- **firstName** (`string`)  
  The patient's first name.

- **lastName** (`string`)  
  The patient's last name.

- **middleName** (`string`)  
  The patient's middle name.

- **fullName** (`string`)  
  The full name of the patient.

- **dob** (`string`)  
  Date of birth in `YYYY-MM-DD` format.

- **gender** (`string`)  
  The patient's gender.

- **phone** (`string`)  
  The patient's phone number.

- **email** (`string`)  
  The patient's email address.

- **address** (`string`)  
  The patient's physical address.

### Additional Fields in the Top-Level Patient Medical Record

- **medicalHistory** (`Array<object>`)  
  Past or ongoing medical conditions, structured as described above.

- **allergies** (`Array<string>`)  
  Known allergies.

- **medications** (`Array<object>`)  
  Current medications and relevant details.

- **appointments** (`Array<object>`)  
  A list of appointment records for the patient.

- **prescriptions** (`Array<object>`)  
  Prescription records associated with the patient.

- **payments** (`Array<object>`)  
  Payment transactions related to treatments or appointments.

- **labResults** (`Array<object>`)  
  Laboratory test results.

- **imaging** (`Array<object>`)  
  Imaging study results.

- **notes** (`string`)  
  General health notes or additional observations.

---

This documentation provides a detailed overview of the `USERS` object and its nested structures, ensuring clarity on the purpose and type of every field for developers working on the application.