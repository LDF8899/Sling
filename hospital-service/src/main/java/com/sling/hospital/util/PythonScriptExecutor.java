package com.sling.hospital.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Executes external Python scripts with configurable interpreter path.
 * <p>
 * The Python executable location is configured via {@code app.python.executable}.
 */
@Slf4j
@Component
public class PythonScriptExecutor {

    @Value("${app.python.executable}")
    private String pythonExecutable;

    /**
     * Execute a Python script with the given argument list.
     *
     * @param scriptPath the absolute path to the Python script
     * @param params     the CLI arguments to pass to the script
     * @return the combined stdout output of the script
     * @throws RuntimeException if the script exits with a non-zero code or cannot be executed
     */
    public String executePythonScript(String scriptPath, List<String> params) {
        List<String> command = new ArrayList<>();
        command.add(pythonExecutable);
        command.add(scriptPath);
        command.addAll(params);

        StringBuilder logCommand = new StringBuilder();
        for (int i = 0; i < command.size(); i++) {
            if (i > 0) logCommand.append(" ");
            logCommand.append(command.get(i));
        }
        log.info("Executing Python script: {}", logCommand);

        try {
            ProcessBuilder processBuilder = new ProcessBuilder(command);
            processBuilder.environment().put("PYTHONIOENCODING", "utf-8");

            Process process = processBuilder.start();

            StringBuilder output = new StringBuilder();
            StringBuilder errorOutput = new StringBuilder();

            // Read stdout
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream(), "UTF-8"))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            } catch (java.io.UnsupportedEncodingException e) {
                try (BufferedReader reader = new BufferedReader(
                        new InputStreamReader(process.getInputStream()))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        output.append(line).append("\n");
                    }
                }
            }

            // Read stderr
            try (BufferedReader errorReader = new BufferedReader(
                    new InputStreamReader(process.getErrorStream(), "UTF-8"))) {
                String line;
                while ((line = errorReader.readLine()) != null) {
                    errorOutput.append(line).append("\n");
                }
            } catch (java.io.UnsupportedEncodingException e) {
                try (BufferedReader errorReader = new BufferedReader(
                        new InputStreamReader(process.getErrorStream()))) {
                    String line;
                    while ((line = errorReader.readLine()) != null) {
                        errorOutput.append(line).append("\n");
                    }
                }
            }

            int exitCode = process.waitFor();

            if (exitCode != 0) {
                log.error("Python script exited with code {}: {}", exitCode, errorOutput.toString());
                throw new RuntimeException("Python script execution failed: " + errorOutput.toString());
            }

            String result = output.toString().trim();
            log.info("Python script executed successfully, output: {}", result);
            return result;

        } catch (IOException | InterruptedException e) {
            log.error("Error executing Python script: {}", e.getMessage(), e);
            throw new RuntimeException("Error executing Python script: " + e.getMessage(), e);
        }
    }
}
